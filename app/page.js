import Link from 'next/link';
import Navbar from './Navbar';
import { Contact, Footer, OverOns, Prijzen } from './sections';
import { SALON, pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({ path: '/' });

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="home">
        <section className="hx-hero">
          <div className="hx-hero-pattern" aria-hidden="true"></div>
          <div className="hx-wrap hx-hero-grid">
            <div className="hx-hero-text">
              <p className="hx-label">Dames &amp; Heren Kapsalon — Eerbeek</p>
              <h1>
                Knippen.
                <br />
                Stylen.
                <br />
                <span>Verzorgen.</span>
              </h1>
              <p className="hx-hero-lead">
                Voor dames, heren en kids. Plan je afspraak online in een paar klikken, of loop
                even binnen aan de Coldenhovenseweg.
              </p>
              <div className="hx-actions">
                <Link href="/afspraak" className="hx-btn hx-btn-copper">
                  Afspraak plannen
                </Link>
                <Link href="/prijzen" className="hx-btn hx-btn-ghost">
                  Prijzen bekijken
                </Link>
              </div>
            </div>
            <div className="hx-hero-photo">
              <img
                src="/hero-in2hairstyle.jpg"
                alt="De ingang van In2Hairstyle aan de Coldenhovenseweg in Eerbeek"
                fetchPriority="high"
              />
            </div>
          </div>
        </section>

        <div className="hx-strip">
          <div className="hx-wrap hx-strip-grid">
            <div>
              <span className="hx-strip-label">Adres</span>
              <span>Coldenhovenseweg 6a, Eerbeek</span>
            </div>
            <div>
              <span className="hx-strip-label">Telefoon</span>
              <a href={`tel:${SALON.phoneIntl}`}>{SALON.phone}</a>
            </div>
            <div>
              <span className="hx-strip-label">Geopend</span>
              <span>Dinsdag t/m zaterdag</span>
            </div>
          </div>
        </div>

        <OverOns />
        <Prijzen />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
