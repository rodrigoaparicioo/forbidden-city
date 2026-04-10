import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page-root">
      {/* ── Google Fonts & Icons ── */}
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Newsreader:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .landing-page-root {
          --primary: #840101;
          --primary-container: #a62116;
          --secondary: #735c00;
          --secondary-fixed: #ffe088;
          --surface: #fef9f0;
          --surface-bright: #fef9f0;
          --surface-container: #f2ede4;
          --surface-container-lowest: #ffffff;
          --on-surface: #1d1c16;
          --on-primary: #ffffff;
          --on-secondary: #ffffff;
          --surface-variant: #e7e2d9;
          --outline-variant: #e2beb9;
          
          background-color: var(--surface);
          color: var(--on-surface);
          font-family: 'Newsreader', serif;
        }
        
        .landing-page-root * {
          box-sizing: border-box;
        }

        .font-headline { font-family: 'Noto Serif', serif; }
        .font-body { font-family: 'Newsreader', serif; }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        /* Nav */
        .lp-nav {
          position: fixed;
          top: 0; left: 0; width: 100%;
          z-index: 50;
          background-color: rgba(254, 249, 240, 0.9);
          backdrop-filter: blur(20px);
          transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .lp-nav-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1536px;
          margin: 0 auto;
          padding: 24px 48px;
        }
        .lp-nav-logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary);
          letter-spacing: -0.05em;
        }
        .lp-nav-links {
          display: none;
          align-items: center;
          gap: 48px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.875rem;
        }
        @media(min-width: 768px) { .lp-nav-links { display: flex; } }
        .lp-nav-links a {
          text-decoration: none;
          color: var(--on-surface);
          transition: color 0.5s;
        }
        .lp-nav-links a.active {
          color: var(--primary);
          border-bottom: 2px solid var(--secondary);
          padding-bottom: 4px;
        }
        .lp-nav-links a:hover { color: var(--primary); }
        .lp-nav-btn {
          padding: 8px 24px;
          background: var(--primary);
          color: var(--on-primary);
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          border: none;
          cursor: pointer;
          transition: all 0.5s;
        }
        .lp-nav-btn:hover { background: var(--secondary); }

        /* General Buttons */
        .btn-primary {
          padding: 16px 40px;
          background: linear-gradient(135deg, var(--primary), var(--primary-container));
          color: var(--on-primary);
          text-transform: uppercase;
          font-size: 0.875rem;
          letter-spacing: 0.2em;
          border: none;
          cursor: pointer;
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-primary:hover {
          background: var(--secondary);
          letter-spacing: 0.3em;
        }
        .btn-ghost-hero {
          padding: 16px 40px;
          background: transparent;
          color: var(--secondary-fixed);
          border: 1px solid rgba(255, 224, 136, 0.4);
          text-transform: uppercase;
          font-size: 0.875rem;
          letter-spacing: 0.2em;
          cursor: pointer;
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-ghost-hero:hover {
          background: rgba(255, 224, 136, 0.15);
          border-color: var(--secondary-fixed);
          letter-spacing: 0.3em;
        }
        .btn-ghost {
          padding: 16px 40px;
          background: transparent;
          color: var(--primary);
          border: 1px solid rgba(142, 112, 108, 0.4);
          text-transform: uppercase;
          font-size: 0.875rem;
          letter-spacing: 0.2em;
          cursor: pointer;
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-ghost:hover {
          background: var(--primary);
          color: var(--on-primary);
        }

        /* Hero */
        .hero {
          position: relative;
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .hero-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(132, 1, 1, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%);
        }
        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 0 16px;
        }
        .hero-title {
          font-size: clamp(3.75rem, 8vw, 8rem);
          color: var(--secondary-fixed);
          margin-bottom: 32px;
          letter-spacing: -0.05em;
          line-height: 1;
          margin-top: 0;
        }
        .hero-sub {
          font-size: clamp(1.25rem, 3vw, 1.875rem);
          font-style: italic;
          color: var(--surface-bright);
          margin-bottom: 48px;
          max-width: 42rem;
          margin-left: auto;
          margin-right: auto;
        }
        .hero-btns {
          display: flex;
          gap: 24px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .hero-arrow {
          position: absolute;
          bottom: 48px;
          left: 50%;
          transform: translateX(-50%);
          animation: bounce 2s infinite;
        }
        .hero-arrow span {
          color: var(--surface-bright);
          font-size: 2.25rem;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0) translateX(-50%); }
          50% { transform: translateY(-25%) translateX(-50%); }
        }

        /* Common */
        .container {
          max-width: 1280px;
          margin: 0 auto;
        }
        .lattice-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(var(--secondary) 0.5px, transparent 0.5px);
          background-size: 24px 24px;
          opacity: 0.1;
          pointer-events: none;
        }

        /* Section 1 */
        .sec-1 {
          padding: 128px 32px;
          background: var(--surface-container);
          position: relative;
          overflow: hidden;
        }
        .sec-1-grid {
          display: grid;
          gap: 80px;
          align-items: center;
          position: relative;
          z-index: 10;
        }
        @media(min-width: 768px) { .sec-1-grid { grid-template-columns: 1fr 1fr; } }
        .sec-1-content {
          order: 2;
        }
        @media(min-width: 768px) { .sec-1-content { order: 1; } }
        .sec-1-images {
          order: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media(min-width: 768px) { .sec-1-images { order: 2; } }
        .subheading {
          color: var(--secondary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.875rem;
          margin-bottom: 16px;
          display: block;
        }
        .sec-title {
          font-size: clamp(2.5rem, 5vw, 3rem);
          color: var(--primary);
          margin-bottom: 32px;
          line-height: 1.2;
          margin-top: 0;
        }
        .sec-text {
          font-size: 1.25rem;
          color: rgba(29, 28, 22, 0.8);
          line-height: 1.8;
          margin-bottom: 24px;
        }
        .sec-1-img1 {
          width: 100%; height: 384px; object-fit: cover;
          border-bottom: 8px solid var(--secondary);
        }
        .sec-1-img2 {
          width: 100%; height: 384px; object-fit: cover;
          margin-top: 48px; border-top: 8px solid var(--primary);
        }

        /* Section 2 */
        .sec-2 {
          padding: 128px 32px;
          background: var(--surface);
        }
        .sec-2-header {
          text-align: center;
          margin-bottom: 80px;
        }
        .sec-2-title {
          font-size: clamp(2.5rem, 5vw, 3rem);
          color: var(--on-surface);
          margin-bottom: 16px;
          margin-top: 0;
        }
        .sec-2-line {
          width: 96px; height: 4px;
          background: var(--secondary);
          margin: 0 auto;
        }
        .cards {
          display: grid; gap: 32px;
        }
        @media(min-width: 768px) { .cards { grid-template-columns: repeat(3, 1fr); } }
        .card {
          background: var(--surface-container-lowest);
          position: relative; overflow: hidden;
          transition: transform 0.7s;
          cursor: pointer;
        }
        .card:hover { transform: translateY(-8px); }
        .card-img-box {
          aspect-ratio: 4 / 5; overflow: hidden;
        }
        .card-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 1s;
        }
        .card:hover .card-img { transform: scale(1.1); }
        .card-body {
          padding: 32px;
          border-top: 4px solid var(--secondary);
        }
        .card-title {
          font-size: 1.5rem; color: var(--primary);
          margin: 0 0 8px 0;
        }
        .card-desc {
          font-style: italic; color: rgba(29, 28, 22, 0.7);
          margin: 0 0 24px 0;
        }
        .card-link {
          display: inline-flex; align-items: center;
          color: var(--secondary);
          font-size: 0.875rem; text-transform: uppercase;
          letter-spacing: 0.1em; text-decoration: none;
          transition: color 0.3s;
        }
        .card:hover .card-link { color: var(--primary); }
        .card-link span { margin-left: 8px; font-size: 1rem; }

        /* Section 3 */
        .sec-3 {
          padding: 128px 0;
          background: var(--primary);
          color: var(--on-primary);
          overflow: hidden;
        }
        .sec-3-grid {
          display: grid; gap: 64px; align-items: center;
          padding: 0 32px;
        }
        @media(min-width: 1024px) { .sec-3-grid { grid-template-columns: 5fr 7fr; } }
        .subheading-alt {
          color: var(--secondary-fixed);
          text-transform: uppercase; letter-spacing: 0.1em;
          font-size: 0.875rem; margin-bottom: 16px; display: block;
        }
        .sec-3-title {
          font-size: clamp(2.5rem, 5vw, 3rem);
          margin-bottom: 32px; line-height: 1.2; margin-top: 0;
        }
        .sec-3-desc {
          font-size: 1.25rem; color: rgba(231, 226, 217, 0.9);
          margin-bottom: 40px; line-height: 1.8;
        }
        .features {
          display: flex; flex-direction: column; gap: 32px;
        }
        .feature { display: flex; align-items: flex-start; gap: 24px; }
        .feature-icon { color: var(--secondary-fixed); font-size: 1.875rem; }
        .feature-title { font-size: 1.25rem; margin: 0 0 8px 0; }
        .feature-desc { color: rgba(255,255,255,0.7); margin: 0; line-height: 1.6; }
        
        .arch-img-box {
          position: relative; height: 600px;
        }
        .arch-img {
          width: 100%; height: 100%; object-fit: cover;
          filter: grayscale(100%) brightness(75%) contrast(125%);
        }
        .arch-overlay {
          position: absolute; inset: 0;
          background: rgba(132, 1, 1, 0.2); mix-blend-mode: multiply;
        }
        .arch-quote {
          position: absolute; bottom: -32px; left: -32px;
          background: var(--secondary); padding: 48px;
          max-width: 384px; display: none;
        }
        @media(min-width: 768px) { .arch-quote { display: block; } }
        .arch-quote p {
          color: var(--on-secondary); font-size: 1.5rem;
          line-height: 1.2; font-style: italic; margin: 0;
        }

        /* CTA */
        .cta {
          padding: 160px 32px;
          background: var(--surface);
          position: relative; text-align: center;
        }
        .cta .lattice-pattern { opacity: 0.05; }
        .cta-content { position: relative; z-index: 10; max-width: 896px; margin: 0 auto; }
        .cta-title {
          font-size: clamp(3rem, 6vw, 3.75rem);
          color: var(--primary); margin-bottom: 48px; margin-top: 0;
        }
        .cta-btns {
          display: flex; flex-direction: column; gap: 24px; justify-content: center;
        }
        @media(min-width: 768px) { .cta-btns { flex-direction: row; } }

        /* Footer */
        .footer {
          background: #840101;
          border-top: 4px solid var(--secondary);
          padding: 80px 32px; text-align: center;
        }
        .footer-logo {
          color: var(--surface); font-size: 1.25rem; margin-bottom: 32px;
        }
        .footer-links {
          display: flex; flex-wrap: wrap; justify-content: center;
          gap: 32px; margin-bottom: 48px;
        }
        .footer-links a {
          color: rgba(254, 249, 240, 0.8); font-style: italic;
          font-size: 1.125rem; text-decoration: none; transition: color 0.3s;
        }
        .footer-links a:hover { color: var(--secondary); }
        .footer-copy {
          color: rgba(254, 249, 240, 0.6); font-size: 0.875rem;
          margin: 0 auto 32px auto; max-width: 672px;
        }
        .footer-icons {
          display: flex; gap: 24px; justify-content: center;
          color: var(--secondary);
        }
        .footer-icons span {
          cursor: pointer; transition: color 0.3s;
        }
        .footer-icons span:hover { color: #fff; }
      `}</style>

      {/* ── NAV ── */}
      <nav className="lp-nav">
        <div className="lp-nav-inner">
          <div className="lp-nav-logo font-headline">
            故宫 AI
          </div>
          <div className="lp-nav-links font-headline">
            <a href="#architecture" className="active">Architecture</a>
            <a href="#history">History</a>
            <a href="#palaces">Palaces</a>
            <a href="#exhibits">Exhibits</a>
          </div>
          <button className="lp-nav-btn font-headline">
            Explore Now
          </button>
        </div>
      </nav>

      <main>
        {/* ── HERO ── */}
        <section className="hero">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVLGpP4AXEPkwhqdn-mBdXC5TxUxkd4ECUCggiUN2qW0agaGct4YZO3VrHP2YvOQztrGdKjt8f4a4ZPR400vimvFAV7ylxlxGieMKxagZsZ6v2XLUOyk2rxre-pMvbcA_SXOj-uQbBBVLPWZzK_p0S0oELhlZKTZEct_2bPED1AEYiqZVqm1Su-QEEpWDA8CDWtocC_qCk_v0c3dVx3-sGAPVziamzlrSluH5ZtOH90EqGS-dJOE-7T55Z1MOXs0oqCvwG-e0Dbl9l"
            alt="Hall of Supreme Harmony"
            className="hero-img"
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1 className="hero-title font-headline">
              故宫 AI
            </h1>
            <p className="hero-sub font-body">
              Where the Son of Heaven resided and history was etched in stone and timber.
            </p>
            <div className="hero-btns">
              <button
                className="btn-primary font-headline"
                onClick={() => navigate("/map")}
              >
                Interactive Map
              </button>
              <button
                className="btn-ghost-hero font-headline"
                onClick={() => navigate("/yhlas")}
              >
                YHLAS
              </button>
            </div>
          </div>
          <div className="hero-arrow">
            <span className="material-symbols-outlined">keyboard_double_arrow_down</span>
          </div>
        </section>

        {/* ── SECTION 1: EDITORIAL ── */}
        <section className="sec-1" id="architecture">
          <div className="lattice-pattern" />
          <div className="container sec-1-grid">
            <div className="sec-1-content">
              <span className="subheading font-headline">Cultural Essence</span>
              <h2 className="sec-title font-headline">A Legacy in Crimson &amp; Gold</h2>
              <div className="font-body">
                <p className="sec-text">
                  In the cosmology of ancient China, colors were never mere decoration. The deep vermilion of the palace walls represents Fire and good fortune, while the brilliant yellow of the glazed roof tiles was reserved exclusively for the Emperor, symbolizing the Earth at the center of the universe.
                </p>
                <p className="sec-text">
                  Each courtyard of the Forbidden City is a physical manifestation of the Five Elements, balanced with a mathematical precision that has endured for six centuries.
                </p>
              </div>
            </div>
            <div className="sec-1-images">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFLr9D_ZfCTwMs8z_iy5Er3K5-JGttXoXYzoMeJpOmNgFoiKULs_KQldfcDQ9yAcpyVJsJmA-M4JvG6o5M-77htnBzkX665Plpq8MoI2US7EbHKsD5gcdAuXgrfZ_BKtsaKXzPLJVpHsVqCvmu763Pxd-1uCq0Oajac2H_qmPcmandxcPnSeJO9usvh93bbgqmBKTKlGuppAc4K9RuGzcR0Pqop-ONuYa9a46bE2hPg3zDysR2uQ-1ngU0BgpVu836_Znc6a19FW2_"
                alt="Red walls"
                className="sec-1-img1"
              />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHbcWNJzFihQalEBp_wluI7wEieqrXBkLzWCGkjKsk6qQHFWhaETHQyyEbRTY3LDKVCWoWnTBvjmgHAwyllDj-rUB0-Hd06eQU1dP3SFfI29L1QJA0Umi47EKbveE_Vb65hZ-O_FPPsuSLvbw7aD0YIKEPXpvGiuFLP0OEhV9gYKgMSkp4h_28SH2V2m4a0kxMGYsr-T9RXGclgr-ReOEeEJKlKF-Mqqaft7VbK0KNXUTmmWHljajkwybk4k5fuLX0zQK_14HAHxWh"
                alt="Golden roofs"
                className="sec-1-img2"
              />
            </div>
          </div>
        </section>

        {/* ── SECTION 2: EXPLORATION GRID ── */}
        <section className="sec-2" id="history">
          <div className="container">
            <div className="sec-2-header">
              <h2 className="sec-2-title font-headline">Explore the Forbidden City</h2>
              <div className="sec-2-line" />
            </div>
            <div className="cards">
              {/* Card 1 */}
              <Link to="/map" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div className="card">
                  <div className="card-img-box">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXTlFYXzMYf5BEghQJEsKzkh_kfOTqgByunNjq0OyppHI7oE-SFm98A_BQ-MF_W6iKhWLiH7sROI6E4a4WBcfqWm_DrYRP-gTtGfwFI22Ce4eoM2ul8SZzwnxX13I7uuyo6-q4r6_5DLlcn51RKRRbwKEM81TscJWmhemdQaZYMwe4fpPZvcinSOmsU7fdlqiCTNxmeHBdgTrC7nsU2d7fNUltchAuJ5gVEaqCM42o8kspTuf90tTlkVchX11OfwUmuOEv9F4EjtI_"
                      alt="Hall of Preserving Harmony"
                      className="card-img"
                    />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title font-headline">Hall of Preserving Harmony</h3>
                    <p className="card-desc font-body">The site of the final imperial examinations and grand banquets.</p>
                    <span className="card-link font-headline">
                      Discover more <span className="material-symbols-outlined">arrow_right_alt</span>
                    </span>
                  </div>
                </div>
              </Link>
              {/* Card 2 */}
              <Link to="/yhlas" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div className="card">
                  <div className="card-img-box">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLfppiah6T2-3F3zylt0j65ZuTQ23G2hL5ZDnGLFvINqAX_fCR4sNZ9oZujaxkEuxmqrVY23aBLpWN3VOlmGAJAP5y8wO3vBrph9tJgJq94-Fvts9AhUHwJW7d7-D9e29YCDBHVasj2Qa9HKQMACiTMnqxnxSZCd6OrUIyQvX5so_ZyRVR-5iYiGZ_jKDy6icyPmJcldDRAPetNF3SpY_HA12k6lt2hvHaCEZs0T555nV7tiJa-QT41OKjJ-cOJV5MV4pMWPgLkNYA"
                      alt="Palace of Heavenly Purity"
                      className="card-img"
                    />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title font-headline">Palace of Heavenly Purity</h3>
                    <p className="card-desc font-body">The primary residence of Emperors during the Ming and early Qing dynasties.</p>
                    <span className="card-link font-headline">
                      Discover more <span className="material-symbols-outlined">arrow_right_alt</span>
                    </span>
                  </div>
                </div>
              </Link>
              {/* Card 3 */}
              <Link to="/yhlas" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div className="card">
                  <div className="card-img-box">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2lzGYAbDXIfd31RYy7pNYweh1ref2WHTZKieN8Q-Id2L6FOFY1GESnxCxuBra8U25E2Tn08kU23aEa9F4ozYgwikVPtrF8KdLoaODgh2Kvs-i3AkrwZb6HSv0ZG2DBZbyCQ6HeXwTofK4rHa7xjatfLi0bqqVexftVGcRavqThv6kNVkRmmNJLLnxWIJ_8wRt_Hco10JXQ3qXRzm-_6ycByPSY_7ZJy3-1NENSZaEc__Ux_jL2zsg5nwXXaQwDk7AjkP8bQ2b6zXI"
                      alt="Imperial Garden"
                      className="card-img"
                    />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title font-headline">The Imperial Garden</h3>
                    <p className="card-desc font-body">A private sanctuary of rockeries, cypress trees, and classical pavilions.</p>
                    <span className="card-link font-headline">
                      Discover more <span className="material-symbols-outlined">arrow_right_alt</span>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: MARVELS ── */}
        <section className="sec-3" id="palaces">
          <div className="container sec-3-grid">
            <div>
              <span className="subheading-alt font-headline">Structural Ingenuity</span>
              <h2 className="sec-3-title font-headline">Architectural Marvels: The Dougong</h2>
              <p className="sec-3-desc font-body">
                One of the most remarkable features of imperial architecture is the complete absence of nails. The entire structure is held together by the <span style={{ color: "var(--secondary-fixed)", fontStyle: "italic" }}>Dougong</span>—an intricate system of interlocking wooden brackets.
              </p>
              <div className="features">
                <div className="feature">
                  <span className="material-symbols-outlined feature-icon">architecture</span>
                  <div>
                    <h4 className="feature-title font-headline">Seismic Resilience</h4>
                    <p className="feature-desc font-body">The flexibility of the joinery allows the massive buildings to sway and absorb energy during earthquakes.</p>
                  </div>
                </div>
                <div className="feature">
                  <span className="material-symbols-outlined feature-icon">precision_manufacturing</span>
                  <div>
                    <h4 className="feature-title font-headline">Precision Craft</h4>
                    <p className="feature-desc font-body">Each piece is hand-carved to fit with sub-millimeter precision, a testament to thousand-year-old wisdom.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="arch-img-box">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzhyCsRgcD01yciuk7wz2_gjd0rIFS1x3bqU67o8Z52rHCvFKbCp_LOkSrK1O7qfyDXUd5-G_BOsv2iSy-6cvx1WOUXjDOcnlFnDBXZ6yE_9FX9nGqHf6LPQiDeuipw41Z4mPtAq1OOWcKJiKOmOLRKn-JL4VtmqfZiTQFoxBv0aMfbJ74J_5N5OGLE83m33ix8o8ShM-2cGM0Bn_0uRQq_IWiwor-t1W8FNWcFUjQVs2VewcFTNZ41dEG1sMrY4Tg8dwhsRXwJ90k"
                alt="Architectural detail"
                className="arch-img"
              />
              <div className="arch-overlay" />
              <div className="arch-quote">
                <p className="font-headline">"Gravity is the only nail required to hold a palace together."</p>
              </div>
            </div>
          </div>
        </section>


      </main>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-logo font-headline">
          故宫 AI
        </div>
        <div className="footer-links font-body">
          <a href="#heritage" onClick={(e) => e.preventDefault()}>Cultural Heritage</a>
          <a href="#archive" onClick={(e) => e.preventDefault()}>Archive</a>
          <a href="#conservation" onClick={(e) => e.preventDefault()}>Conservation</a>
          <a href="#contact" onClick={(e) => e.preventDefault()}>Contact</a>
          <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy</a>
        </div>
        <p className="footer-copy font-body">
          © 2024 The Digital Pavilion. All Rights Reserved. Preservation of the Ming &amp; Qing Legacies.
        </p>
        <div className="footer-icons">
          <span className="material-symbols-outlined">temple_buddhist</span>
          <span className="material-symbols-outlined">history_edu</span>
          <span className="material-symbols-outlined">museum</span>
        </div>
      </footer>
    </div>
  );
}
