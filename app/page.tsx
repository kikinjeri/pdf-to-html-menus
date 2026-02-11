export default function Home() {
  return (
    <main className="homepage">

      {/* HERO SECTION */}
      <section className="hero">

        {/* CENTERED HEADER ABOVE BOTH COLUMNS */}
        <div className="hero-header">
          <h1 className="hero-title">
            Elevate your restaurant’s online presence
          </h1>
        </div>

        <div className="hero-grid">

          {/* LEFT COLUMN */}
          <div className="hero-left">

            {/* TAGLINE ALIGNED WITH FIRST BENEFIT ROW */}
            <h2 className="hero-tagline">
              Convert PDF menus to HTML
            </h2>

            <p className="hero-subtitle">
              Fast, accessible, mobile‑friendly menus that help customers discover dishes,
              improve SEO, and load instantly on any device.
            </p>

            <form className="upload-box" aria-label="Upload PDF Menu">
              <input type="file" className="file-input" aria-label="Choose PDF file" />
              <button className="upload-btn">Upload PDF Menu</button>
            </form>
          </div>

          {/* RIGHT COLUMN — BENEFITS */}
          <div className="hero-right">

            <div className="benefit-row fade-in">
              <span className="benefit-icon" aria-hidden="true">🔍</span>
              <div>
                <h3>SEO & Discoverability</h3>
                <p>Search engines can index every dish and improve your ranking for local food searches.</p>
              </div>
            </div>

            <div className="benefit-row fade-in delay-1">
              <span className="benefit-icon" aria-hidden="true">♿</span>
              <div>
                <h3>Accessibility</h3>
                <p>Screen‑reader friendly, semantic HTML ensures your menu works for everyone.</p>
              </div>
            </div>

            <div className="benefit-row fade-in delay-2">
              <span className="benefit-icon" aria-hidden="true">⚡</span>
              <div>
                <h3>Performance</h3>
                <p>Loads instantly on any device — even with slow connections.</p>
              </div>
            </div>

            <div className="benefit-row fade-in delay-3">
              <span className="benefit-icon" aria-hidden="true">📣</span>
              <div>
                <h3>Marketing</h3>
                <p>Shareable on social media and embeddable on any website.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-horizontal">
        <span>M. George</span>
        <span>Phone: 343‑111‑1111</span>
        <span>Email: yourname@example.com</span>
      </footer>

    </main>
  );
}

