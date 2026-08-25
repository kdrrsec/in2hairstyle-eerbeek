import Navbar from './Navbar';

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <Navbar />

      <main id="top">
        <section className="hero">
          <div className="hero-bg" aria-hidden="true"></div>
          <div className="hero-content">
            <p className="eyebrow">Dames &amp; Heren Kapsalon · Eerbeek</p>
            <h1>
              Jouw stijl,
              <br />
              onze passie.
            </h1>
            <p className="hero-sub">
              Bij In2Hairstyle sta je persoonlijk centraal. Vakmanschap, oog voor detail en een
              warm welkom in het hart van Eerbeek.
            </p>
            <div className="hero-actions">
              <a href="/afspraak" className="btn btn-primary">
                Maak afspraak
              </a>
              <a href="#diensten" className="btn btn-ghost">
                Bekijk diensten
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="over-ons">
          <div className="container split">
            <div className="split-media" aria-hidden="true">
              <div className="media-frame">
                <svg viewBox="0 0 200 200" className="scissors-art">
                  <circle
                    cx="100"
                    cy="100"
                    r="96"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    opacity="0.35"
                  />
                  <g transform="translate(100 100)">
                    <path
                      d="M-40 -35 L15 20 M-40 35 L15 -20"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <circle cx="-45" cy="-35" r="9" fill="none" stroke="currentColor" strokeWidth="4" />
                    <circle cx="-45" cy="35" r="9" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path
                      d="M15 20 L45 30 M15 -20 L45 -30"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div className="split-text">
              <p className="eyebrow">Over ons</p>
              <h2>Vakmanschap met een persoonlijke touch</h2>
              <p>
                In2Hairstyle is dé kapsalon voor dames en heren in Eerbeek. Met jarenlange
                ervaring en een scherp oog voor de laatste trends zorgen wij voor een knipbeurt
                die precies bij jou past — of je nu op zoek bent naar een frisse nieuwe look of
                een vertrouwde stijl.
              </p>
              <p>
                Bij ons ben je aan het juiste adres voor knippen, kleuren, stylen en alles
                daartussenin. Kwaliteit, gezelligheid en aandacht voor de klant staan bij ons
                voorop.
              </p>
              <ul className="checklist">
                <li>Ervaren kappers voor dames, heren &amp; kinderen</li>
                <li>Persoonlijk advies op maat</li>
                <li>Gezellige sfeer in Eerbeek</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section section-alt" id="diensten">
          <div className="container">
            <p className="eyebrow center">Diensten</p>
            <h2 className="center">Waar wij je mee kunnen helpen</h2>
            <div className="cards">
              <div className="card">
                <div className="card-icon">✂️</div>
                <h3>Knippen</h3>
                <p>Een knipbeurt op maat, helemaal afgestemd op jouw stijl.</p>
                <span className="card-price">vanaf €27,50</span>
              </div>
              <div className="card">
                <div className="card-icon">🧔</div>
                <h3>Baard</h3>
                <p>Strak getrimd en verzorgd, perfect in lijn met je gezicht.</p>
                <span className="card-price">vanaf €17,50</span>
              </div>
              <div className="card">
                <div className="card-icon">💈</div>
                <h3>Knippen + Baard</h3>
                <p>De complete behandeling. Fris de deur uit van top tot kin.</p>
                <span className="card-price">vanaf €42,50</span>
              </div>
              <div className="card">
                <div className="card-icon">🧒</div>
                <h3>Knippen kind (t/m 12 jaar)</h3>
                <p>Een ontspannen knipbeurt voor de kleintjes, in een gezellige sfeer.</p>
                <span className="card-price">vanaf €22,50</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container split">
            <div className="split-text">
              <p className="eyebrow">Contact</p>
              <h2>Kom langs of maak een afspraak</h2>
              <p>Loop binnen of neem contact op om een afspraak in te plannen. We staan voor je klaar.</p>
              <div className="contact-list">
                <div className="contact-item">
                  <span className="contact-label">Adres</span>
                  <span>Coldenhovenseweg 6a, 6961 ED Eerbeek</span>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Telefoon</span>
                  <a href="tel:+31313410693">0313 410 693</a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Openingstijden</span>
                  <span>
                    Di – Do: 09:30 – 18:00
                    <br />
                    Vr: 09:30 – 20:00
                    <br />
                    Za: 09:30 – 18:00
                    <br />
                    Zo – Ma: Gesloten
                  </span>
                </div>
              </div>
              <a href="/afspraak" className="btn btn-primary">
                Maak afspraak
              </a>
            </div>
            <div className="split-media">
              <div className="map-frame">
                <iframe
                  title="Locatie In2Hairstyle Eerbeek"
                  src="https://www.google.com/maps?q=Coldenhovenseweg+6a,+6961+ED+Eerbeek&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <a href="#top" className="brand brand-footer">
            In2<span>Hairstyle</span>
          </a>
          <p>&copy; {year} In2Hairstyle Eerbeek. Alle rechten voorbehouden.</p>
          <div className="socials">
            <a href="https://www.facebook.com/In2hairstyle/" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href="https://www.instagram.com/in2hairstyle/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
