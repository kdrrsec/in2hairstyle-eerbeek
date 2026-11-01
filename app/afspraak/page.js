import BookingClient from './BookingClient';
import { getTreatments } from '@/lib/treatments';

// De diensten zitten al in de HTML; elke 5 minuten ververst.
export const revalidate = 300;

export default async function AfspraakPage() {
  let treatments = null;
  if (process.env.DATABASE_URL) {
    try {
      treatments = await getTreatments();
    } catch {
      // Dan haalt de pagina ze zelf op via /api/treatments.
    }
  }
  return <BookingClient initialTreatments={treatments} />;
}
