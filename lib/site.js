// Gegevens van de salon, gedeeld door de pagina's, metadata en structured data.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://in2hairstyle.axaweb.nl').replace(
  /\/$/,
  ''
);

export const SALON = {
  name: 'In2Hairstyle',
  description:
    'Kapsalon voor dames, heren en kinderen in Eerbeek. Knippen, baard trimmen en knippen voor kinderen. Online een afspraak maken of binnenlopen.',
  street: 'Coldenhovenseweg 6a',
  postalCode: '6961 ED',
  city: 'Eerbeek',
  region: 'Gelderland',
  country: 'NL',
  phone: '0313 410 693',
  phoneIntl: '+31313410693',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Coldenhovenseweg+6a,+6961+ED+Eerbeek',
  routeUrl: 'https://www.google.com/maps/dir/?api=1&destination=Coldenhovenseweg+6a,+6961+ED+Eerbeek',
  facebook: 'https://www.facebook.com/In2hairstyle/',
  instagram: 'https://www.instagram.com/in2hairstyle/',
};

export const services = [
  {
    name: 'Knippen',
    desc: 'Kort, lang of ergens daartussen: geknipt zoals jij het wilt.',
    duration: '30 min',
    minutes: 30,
    price: '€27,50',
    amount: 27.5,
    icon: 'scissors',
  },
  {
    name: 'Baard',
    desc: 'Getrimd, gemodelleerd en strak opgelijnd.',
    duration: '15 min',
    minutes: 15,
    price: '€17,50',
    amount: 17.5,
    icon: '/icons/beard.png',
  },
  {
    name: 'Knippen + Baard',
    desc: 'Haar en baard in één afspraak, helemaal op elkaar afgestemd.',
    duration: '45 min',
    minutes: 45,
    price: '€42,50',
    amount: 42.5,
    icon: '/icons/cut-beard.png',
  },
  {
    name: 'Knippen kind',
    note: 't/m 12 jaar',
    desc: 'Rustig aan en op hun gemak in de stoel.',
    duration: '30 min',
    minutes: 30,
    price: '€22,50',
    amount: 22.5,
    icon: '/icons/child.png',
  },
];

// [dag, schema.org-dag, open, dicht]
export const hours = [
  ['Maandag', 'Monday', null, null],
  ['Dinsdag', 'Tuesday', '09:30', '18:00'],
  ['Woensdag', 'Wednesday', '09:30', '18:00'],
  ['Donderdag', 'Thursday', '09:30', '18:00'],
  ['Vrijdag', 'Friday', '09:30', '20:00'],
  ['Zaterdag', 'Saturday', '09:30', '18:00'],
  ['Zondag', 'Sunday', null, null],
];

export const navLinks = [
  { href: '/over-ons', label: 'Over ons' },
  { href: '/prijzen', label: 'Prijzen' },
  { href: '/contact', label: 'Contact' },
];

export function salonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    '@id': `${SITE_URL}/#salon`,
    name: SALON.name,
    description: SALON.description,
    url: `${SITE_URL}/`,
    telephone: SALON.phoneIntl,
    image: `${SITE_URL}/hero-in2hairstyle.jpg`,
    logo: `${SITE_URL}/logo.png`,
    priceRange: '€17,50 - €42,50',
    currenciesAccepted: 'EUR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SALON.street,
      postalCode: SALON.postalCode,
      addressLocality: SALON.city,
      addressRegion: SALON.region,
      addressCountry: SALON.country,
    },
    hasMap: SALON.mapsUrl,
    areaServed: { '@type': 'City', name: SALON.city },
    openingHoursSpecification: hours
      .filter(([, , open]) => open)
      .map(([, day, open, close]) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${day}`,
        opens: open,
        closes: close,
      })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Behandelingen',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        price: s.amount.toFixed(2),
        priceCurrency: 'EUR',
        url: `${SITE_URL}/afspraak`,
        itemOffered: {
          '@type': 'Service',
          name: s.note ? `${s.name} (${s.note})` : s.name,
          description: s.desc,
        },
      })),
    },
    potentialAction: {
      '@type': 'ReserveAction',
      target: `${SITE_URL}/afspraak`,
      name: 'Afspraak plannen',
    },
    sameAs: [SALON.facebook, SALON.instagram],
  };
}

const ogImage = { url: '/hero-in2hairstyle.jpg', width: 1920, height: 1280, alt: 'De ingang van In2Hairstyle in Eerbeek' };

// Volledige metadata per pagina; Next vervangt openGraph in zijn geheel, dus alles hier samen.
export function pageMetadata({ title, description = SALON.description, path }) {
  const fullTitle = title ? `${title} | In2Hairstyle Eerbeek` : 'In2Hairstyle | Dames & Heren Kapsalon Eerbeek';
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'nl_NL',
      siteName: 'In2Hairstyle Eerbeek',
      url: path,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [ogImage.url] },
  };
}
