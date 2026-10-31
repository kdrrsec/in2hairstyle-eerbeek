import './globals.css';
import { JsonLd } from './sections';
import { SITE_URL, salonJsonLd } from '@/lib/site';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'In2Hairstyle | Dames & Heren Kapsalon Eerbeek',
    template: '%s | In2Hairstyle Eerbeek',
  },
  applicationName: 'In2Hairstyle',
  formatDetection: { telephone: false },
  robots: { index: true, follow: true },
  other: {
    'geo.region': 'NL-GE',
    'geo.placename': 'Eerbeek',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Barlow:wght@400;500;600&family=Playfair+Display:wght@500;600;700&family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <JsonLd data={salonJsonLd()} />
      </body>
    </html>
  );
}
