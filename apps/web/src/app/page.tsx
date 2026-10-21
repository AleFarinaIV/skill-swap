export default function HomePage() {
  return (
    <main className="page-shell">
      <nav className="topbar" aria-label="Navigazione principale">
        <a className="brand" href="/" aria-label="Skill Swap, homepage">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span>skill swap</span>
        </a>
        <span className="status-pill">Progetto in costruzione</span>
      </nav>

      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">COMPETENZE, TEMPO, COMUNITÀ</p>
        <h1 id="hero-title">Sai qualcosa.<br />Qualcuno vuole impararlo.</h1>
        <p className="hero-copy">
          Skill Swap è il luogo in cui le persone si aiutano a vicenda a imparare,
          scambiando tempo e competenze, senza denaro.
        </p>
        <div className="hero-note">
          <span className="note-icon" aria-hidden="true">↗</span>
          <p>Stiamo costruendo le fondamenta. Le prime funzionalità arriveranno un passo alla volta.</p>
        </div>
      </section>

      <section className="principles" aria-label="Principi del progetto">
        <article className="principle-card">
          <span className="card-number">01</span>
          <h2>Condividi ciò che sai</h2>
          <p>Programmazione, lingue, cucina, design o qualsiasi altra competenza.</p>
        </article>
        <article className="principle-card">
          <span className="card-number">02</span>
          <h2>Impara qualcosa di nuovo</h2>
          <p>Trova persone disposte a insegnarti ciò che vorresti imparare.</p>
        </article>
        <article className="principle-card">
          <span className="card-number">03</span>
          <h2>Scambia tempo, non denaro</h2>
          <p>I crediti rappresentano il tempo dedicato ad aiutarsi a vicenda.</p>
        </article>
      </section>
      <footer className="footer">Skill Swap · MVP · In sviluppo</footer>
    </main>
  );
}
