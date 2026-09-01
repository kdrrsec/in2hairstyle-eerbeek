import './globals.css';

export const metadata = {
  title: 'In2Hairstyle | Dames & Heren Kapsalon Eerbeek',
  description:
    'In2Hairstyle in Eerbeek, dames- en herenkapsalon voor knippen, kleuren en styling. Maak vandaag nog een afspraak.',
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
      </head>
      <body>{children}</body>
    </html>
  );
}
