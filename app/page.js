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
                <span className="card-tag">Knippen</span>
                <div className="card-icon-line">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.64 7.64a3.5 3.5 0 1 0-1.28 1.28L10 10.6 6.36 14.24a3.5 3.5 0 1 0 1.28 1.28L12 11.4l7.5 7.5H21v-1L9.64 7.64ZM6 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm0 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm7.5-9.5-1.4-1.4L21 2h-2Z" />
                  </svg>
                </div>
                <h3>Knippen</h3>
                <p>Een knipbeurt op maat, helemaal afgestemd op jouw stijl.</p>
              </div>
              <div className="card">
                <span className="card-tag">Baard</span>
                <div className="card-icon-line">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3c-3.6 0-6.2 2.7-6.2 6.4v1.9c0 .8-.3 1.5-.9 2-1 .9-1.4 2-1.4 3.3 0 3.5 3.6 5.9 8.5 5.9s8.5-2.4 8.5-5.9c0-1.3-.4-2.4-1.4-3.3-.6-.5-.9-1.2-.9-2V9.4C18.2 5.7 15.6 3 12 3Zm0 2.2c1.9 0 3.2 1.1 3.7 3-1.1-.6-2.4-.9-3.7-.9s-2.6.3-3.7.9c.5-1.9 1.8-3 3.7-3ZM8.4 12.7c.9.6 2.1 1 3.6 1s2.7-.4 3.6-1c.2.6.3 1.3.3 2 0 2.6-1.9 4.3-3.9 4.3s-3.9-1.7-3.9-4.3c0-.7.1-1.4.3-2Z" />
                  </svg>
                </div>
                <h3>Baard</h3>
                <p>Strak getrimd en verzorgd, perfect in lijn met je gezicht.</p>
              </div>
              <div className="card">
                <span className="card-tag">Combi</span>
                <div className="card-icon-line">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 3h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm.5 6h2a.5.5 0 0 1 .5.5V19a1.5 1.5 0 0 1-3 0V9.5a.5.5 0 0 1 .5-.5Zm5.5 0h2a.5.5 0 0 1 .5.5V19a1.5 1.5 0 0 1-3 0V9.5a.5.5 0 0 1 .5-.5Zm5.5 0h2a.5.5 0 0 1 .5.5V19a1.5 1.5 0 0 1-3 0V9.5a.5.5 0 0 1 .5-.5Z" />
                  </svg>
                </div>
                <h3>Knippen + Baard</h3>
                <p>De complete behandeling. Fris de deur uit van top tot kin.</p>
              </div>
              <div className="card">
                <span className="card-tag">Kinderen</span>
                <div className="card-icon-line">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2c-1.8 0-3.2 1.1-3.7 2.8C6.4 5.4 5 7 5 9c0 .9.3 1.7.7 2.4C5.3 12 5 12.9 5 14c0 3.6 3.1 7 7 7s7-3.4 7-7c0-1.1-.3-2-.7-2.6.4-.7.7-1.5.7-2.4 0-2-1.4-3.6-3.3-4.2C15.2 3.1 13.8 2 12 2Zm-2.5 9.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm5 0a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM9 16c.8.7 1.8 1 3 1s2.2-.3 3-1c-.3 1.8-1.5 3-3 3s-2.7-1.2-3-3Z" />
                  </svg>
                </div>
                <h3>Knippen kind (t/m 12 jaar)</h3>
                <p>Een ontspannen knipbeurt voor de kleintjes, in een gezellige sfeer.</p>
              </div>
            </div>

            <div className="price-list">
              <h3 className="price-list-title">Prijslijst</h3>
              <p className="price-list-category">Hoofdbehandelingen</p>
              <div className="price-row">
                <span className="name">Knippen</span>
                <span className="dots"></span>
                <span className="duration">30 min</span>
                <span className="price">€27,50</span>
              </div>
              <div className="price-row">
                <span className="name">Baard</span>
                <span className="dots"></span>
                <span className="duration">15 min</span>
                <span className="price">€17,50</span>
              </div>
              <div className="price-row">
                <span className="name">Knippen + Baard</span>
                <span className="dots"></span>
                <span className="duration">45 min</span>
                <span className="price">€42,50</span>
              </div>
              <div className="price-row">
                <span className="name">Knippen kind (t/m 12 jaar)</span>
                <span className="dots"></span>
                <span className="duration">30 min</span>
                <span className="price">€22,50</span>
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
          <a href="#top" className="brand-footer">
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
