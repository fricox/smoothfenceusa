import { NextResponse } from 'next/server';
import { getSessionHistory } from '@/lib/chatbot/core/engine';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get('sessionId');
  if (!sessionId) {
    return NextResponse.json({ error: 'sessionId required' }, { status: 400 });
  }
  const messages = await getSessionHistory(sessionId);
  return NextResponse.json(
    { messages },
    { headers: { 'Access-Control-Allow-Origin': '*' } }
  );
}
