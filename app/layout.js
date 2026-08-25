import './globals.css';

export const metadata = {
  title: 'In2Hairstyle | Dames & Heren Kapsalon Eerbeek',
  description:
    'In2Hairstyle in Eerbeek — dames- en herenkapsalon voor knippen, kleuren en styling. Maak vandaag nog een afspraak.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%232b1a10'/%3E%3Ctext x='50' y='66' font-size='55' text-anchor='middle' fill='%23c89b5c'%3EI%3C/text%3E%3C/svg%3E"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
