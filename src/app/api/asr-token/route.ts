import { NextResponse } from 'next/server';
import { resolveAsrTokenResponse } from './config';

export async function GET() {
    const result = resolveAsrTokenResponse(process.env);
    return NextResponse.json(result.body, { status: result.status });
}
