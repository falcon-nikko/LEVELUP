import { SUPABASE_URL } from '@/lib/supabase/constants';

export interface SessionUser {
  id: string;
  email?: string;
}

export interface CookieSession {
  user: SessionUser;
  expiresAt: number | null;
  accessTokenExpired: boolean;
  hasRefreshToken: boolean;
}

const PROJECT_REF = SUPABASE_URL.replace(/^https?:\/\//, '').split('.')[0];
const COOKIE_BASE = `sb-${PROJECT_REF}-auth-token`;

/** Base64url → UTF-8-ish string, safe in both the Edge runtime and Node. */
function decodeBase64(input: string): string | null {
  try {
    const b64 = input.replace(/-/g, '+').replace(/_/g, '/');
    const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
    return atob(padded);
  } catch {
    return null;
  }
}

function parseSessionJson(raw: string): Record<string, unknown> | null {
  const trimmed = raw.trim();
  if (trimmed.startsWith('{')) {
    try {
      return JSON.parse(trimmed) as Record<string, unknown>;
    } catch {
      return null;
    }
  }
  const decoded = decodeBase64(trimmed);
  if (!decoded || !decoded.startsWith('{')) return null;
  try {
    return JSON.parse(decoded) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/**
 * Reassemble the @supabase/ssr auth cookie.
 *
 * supabase-js splits large payloads into `sb-<ref>-auth-token.0`, `.1`, …
 * and stores the value either as raw JSON or base64url-encoded JSON.
 */
function readRawCookieValue(cookies: { name: string; value: string }[]): string | null {
  const exact = cookies.find((c) => c.name === COOKIE_BASE);
  if (exact?.value) return exact.value;

  const chunks = cookies
    .filter((c) => c.name.startsWith(`${COOKIE_BASE}.`))
    .sort((a, b) => {
      const ai = Number(a.name.split('.').pop());
      const bi = Number(b.name.split('.').pop());
      return (Number.isNaN(ai) ? 0 : ai) - (Number.isNaN(bi) ? 0 : bi);
    });

  if (!chunks.length) return null;
  return chunks.map((c) => c.value).join('');
}

function readJwtPayload(token: string): Record<string, unknown> | null {
  const parts = token.split('.');
  if (parts.length < 2) return null;
  const decoded = decodeBase64(parts[1]);
  if (!decoded) return null;
  try {
    return JSON.parse(decoded) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/**
 * Read the signed-in user from the request cookies **without any network call**.
 *
 * Why not `supabase.auth.getUser()`? That verifies the token against
 * `/auth/v1/user`, which requires outbound HTTPS to the Supabase host. In
 * sandboxes/preview environments without that egress the call hangs and the
 * middleware would treat a logged-in operator as anonymous, bouncing them back
 * to `/auth` in a loop.
 *
 * This is a UX gate only. Every read/write the app performs still goes from the
 * browser straight to PostgREST with the user's own JWT, where Supabase
 * validates the signature and applies Row Level Security — so nothing about
 * authorization is weakened here.
 */
export function readCookieSession(
  cookies: { name: string; value: string }[]
): CookieSession | null {
  const raw = readRawCookieValue(cookies);
  if (!raw) return null;

  const session = parseSessionJson(raw);
  if (!session) return null;

  const accessToken = typeof session.access_token === 'string' ? session.access_token : '';
  const refreshToken = typeof session.refresh_token === 'string' ? session.refresh_token : '';
  const expiresAtRaw = session.expires_at;
  const expiresAt = typeof expiresAtRaw === 'number' ? expiresAtRaw : null;

  let user: SessionUser | null = null;
  let accessTokenExpired = true;

  if (accessToken) {
    const payload = readJwtPayload(accessToken);
    const sub = payload?.sub;
    if (typeof sub === 'string' && sub.length > 0) {
      user = { id: sub, email: typeof payload?.email === 'string' ? payload.email : undefined };
    }
    const exp = typeof payload?.exp === 'number' ? payload.exp : null;
    if (exp !== null) {
      // 30s clock-skew grace.
      accessTokenExpired = exp * 1000 < Date.now() - 30_000;
    } else if (expiresAt !== null) {
      accessTokenExpired = expiresAt * 1000 < Date.now() - 30_000;
    }
  }

  // Fall back to the session envelope when the JWT payload is unreadable.
  if (!user) {
    const embedded = session.user as { id?: string; email?: string } | undefined;
    if (embedded && typeof embedded.id === 'string' && embedded.id) {
      user = { id: embedded.id, email: embedded.email };
    }
  }

  if (!user) return null;

  return { user, expiresAt, accessTokenExpired, hasRefreshToken: Boolean(refreshToken) };
}

/**
 * Is there a usable session? An expired access token still counts: supabase-js
 * silently refreshes it from the browser (which does have egress) on the next
 * client call, and locking the operator out for an hour would be wrong.
 */
export function hasUsableSession(session: CookieSession | null): boolean {
  if (!session) return false;
  return !session.accessTokenExpired || session.hasRefreshToken;
}

export { COOKIE_BASE, PROJECT_REF };
