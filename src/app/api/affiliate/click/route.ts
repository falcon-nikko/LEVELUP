import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

/**
 * Fallback affiliate-click logger.
 *
 * The browser calls the `record_affiliate_click` RPC directly; this route only
 * exists for when that call fails. It can itself be unreachable from hosts
 * without egress to Supabase, so it is time-boxed and never hangs the server.
 */
const RPC_TIMEOUT_MS = 4000;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      toolSlug?: string;
      source?: string;
      locale?: string;
    };

    if (!body.toolSlug) {
      return NextResponse.json({ error: 'Missing toolSlug' }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();

    const result = await Promise.race([
      supabase.rpc('record_affiliate_click', {
        p_tool_slug: body.toolSlug,
        p_source: body.source || 'stack',
        p_locale: body.locale || 'es',
      }),
      new Promise<{ data: null; error: 'timeout' }>((resolve) =>
        setTimeout(() => resolve({ data: null, error: 'timeout' }), RPC_TIMEOUT_MS)
      ),
    ]);

    if (result.error || result.data === null) {
      return NextResponse.json({ ok: true, count: null });
    }

    return NextResponse.json({ ok: true, count: result.data });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
