import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Afspraak maken',
  description:
    'Maak online een afspraak bij kapsalon In2Hairstyle in Eerbeek. Kies je behandeling, dag en tijd in een paar klikken.',
  path: '/afspraak',
});

export default function AfspraakLayout({ children }) {
  return children;
}
