import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

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
    const { data, error } = await supabase.rpc('record_affiliate_click', {
      p_tool_slug: body.toolSlug,
      p_source: body.source || 'stack',
      p_locale: body.locale || 'es',
    });

    if (error) {
      return NextResponse.json({ ok: true, count: null });
    }

    return NextResponse.json({ ok: true, count: data });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
