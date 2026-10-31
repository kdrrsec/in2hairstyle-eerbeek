import Navbar from './Navbar';

const services = [
  {
    name: 'Knippen',
    desc: 'Kort, lang of ergens daartussen: geknipt zoals jij het wilt.',
    duration: '30 min',
    price: '€27,50',
    icon: 'scissors',
  },
  {
    name: 'Baard',
    desc: 'Getrimd, gemodelleerd en strak opgelijnd.',
    duration: '15 min',
    price: '€17,50',
    icon: '/icons/beard.png',
  },
  {
    name: 'Knippen + Baard',
    desc: 'Haar en baard in één afspraak, helemaal op elkaar afgestemd.',
    duration: '45 min',
    price: '€42,50',
    icon: '/icons/cut-beard.png',
  },
  {
    name: 'Knippen kind',
    note: 't/m 12 jaar',
    desc: 'Rustig aan en op hun gemak in de stoel.',
    duration: '30 min',
    price: '€22,50',
    icon: '/icons/child.png',
  },
];

const hours = [
  ['Maandag', null],
  ['Dinsdag', '09:30 – 18:00'],
  ['Woensdag', '09:30 – 18:00'],
  ['Donderdag', '09:30 – 18:00'],
  ['Vrijdag', '09:30 – 20:00'],
  ['Zaterdag', '09:30 – 18:00'],
  ['Zondag', null],
];

function ServiceIcon({ icon }) {
  if (icon === 'scissors') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
      </svg>
    );
  }
  return <span className="icon-mask" style={{ '--icon': `url('${icon}')` }} />;
}

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <Navbar />

      <main id="top" className="home">
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
                <a href="/afspraak" className="hx-btn hx-btn-copper">
                  Afspraak plannen
                </a>
                <a href="#prijzen" className="hx-btn hx-btn-ghost">
                  Prijzen bekijken
                </a>
              </div>
            </div>
            <div className="hx-hero-photo">
              <img src="/hero-in2hairstyle.jpg" alt="De ingang van In2Hairstyle in Eerbeek" />
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
              <a href="tel:+31313410693">0313 410 693</a>
            </div>
            <div>
              <span className="hx-strip-label">Geopend</span>
              <span>Dinsdag t/m zaterdag</span>
            </div>
          </div>
        </div>

        <section className="hx-section hx-sand" id="over-ons">
          <div className="hx-wrap hx-salon">
            <div className="hx-hexlogo" aria-hidden="true">
              <div className="hx-hexlogo-inner">
                <img src="/logo.png" alt="" />
              </div>
            </div>
            <div className="hx-salon-text">
              <p className="hx-label">Over ons</p>
              <h2>Kapsalon in Eerbeek</h2>
              <p>
                In2Hairstyle is een kapsalon voor dames, heren en kinderen aan de Coldenhovenseweg
                in Eerbeek.
              </p>
              <p>
                Je kunt bij ons terecht om te knippen en voor je baard. Een afspraak maak je
                online, maar je mag ook gewoon binnenlopen.
              </p>
            </div>
          </div>
        </section>

        <section className="hx-section hx-dark" id="prijzen">
          <div className="hx-hero-pattern hx-pattern-soft" aria-hidden="true"></div>
          <div className="hx-wrap">
            <div className="hx-head">
              <div>
                <p className="hx-label">Behandelingen &amp; prijzen</p>
                <h2>Kies je behandeling</h2>
              </div>
              <p>Klik op een behandeling en plan direct een moment dat jou uitkomt.</p>
            </div>
            <div className="hx-services">
              {services.map((s) => (
                <a key={s.name} href="/afspraak" className="hx-service">
                  <div className="hx-service-top">
                    <span className="hx-service-icon">
                      <ServiceIcon icon={s.icon} />
                    </span>
                    <span className="hx-service-dur">{s.duration}</span>
                  </div>
                  <h3>
                    {s.name}
                    {s.note && <small>{s.note}</small>}
                  </h3>
                  <p>{s.desc}</p>
                  <div className="hx-service-bottom">
                    <span className="hx-service-price">{s.price}</span>
                    <span className="hx-service-go">Boeken</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="hx-section" id="contact">
          <div className="hx-wrap">
            <div className="hx-head">
              <div>
                <p className="hx-label">Contact</p>
                <h2>Langskomen in Eerbeek</h2>
              </div>
              <p>Bel ons gerust, of plan zelf online een afspraak in.</p>
            </div>
            <div className="hx-contact">
              <div className="hx-contact-cards">
                <div className="hx-card">
                  <h3>In2Hairstyle</h3>
                  <p>
                    Coldenhovenseweg 6a
                    <br />
                    6961 ED Eerbeek
                  </p>
                  <p>
                    <a href="tel:+31313410693" className="hx-link">
                      0313 410 693
                    </a>
                  </p>
                  <div className="hx-actions">
                    <a href="/afspraak" className="hx-btn hx-btn-copper">
                      Afspraak plannen
                    </a>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=Coldenhovenseweg+6a,+6961+ED+Eerbeek"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hx-btn hx-btn-ink"
                    >
                      Route
                    </a>
                  </div>
                </div>
                <div className="hx-card">
                  <h3>Openingstijden</h3>
                  <dl className="hx-hours">
                    {hours.map(([day, time]) => (
                      <div key={day} className={time ? '' : 'closed'}>
                        <dt>{day}</dt>
                        <dd>{time || 'Gesloten'}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              <div className="hx-map">
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

      <footer className="hx-footer">
        <div className="hx-wrap hx-footer-grid">
          <a href="#top" className="hx-footer-brand">
            <img src="/logo.png" alt="In2Hairstyle" />
          </a>
          <nav className="hx-footer-nav">
            <a href="#over-ons">Over ons</a>
            <a href="#prijzen">Prijzen</a>
            <a href="#contact">Contact</a>
            <a href="/afspraak">Afspraak</a>
          </nav>
          <div className="hx-footer-social">
            <a href="https://www.facebook.com/In2hairstyle/" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href="https://www.instagram.com/in2hairstyle/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </div>
        <div className="hx-wrap hx-footer-bottom">
          <p>&copy; {year} In2Hairstyle Eerbeek</p>
        </div>
      </footer>
    </>
  );
}
