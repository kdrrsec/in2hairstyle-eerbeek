import { NextResponse } from 'next/server';
import { getTreatments } from '@/lib/treatments';

export async function GET() {
  const treatments = await getTreatments();
  return NextResponse.json(
    { treatments },
    { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400' } }
  );
}
