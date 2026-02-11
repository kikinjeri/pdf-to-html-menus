import UploadForm from "@/components/UploadForm";

export default function HomePage() {
  return (
    <main className="home-container">
      <header className="hero">
        <h1 className="hero-title">Convert PDF Menus to HTML</h1>
        <p className="hero-subtitle">
          Transform restaurant PDF menus into clean, responsive, SEO‑friendly
          HTML & CSS. Perfect for websites, Google Business Profiles, and social
          sharing.
        </p>
      </header>

      <section className="upload-section">
        <UploadForm />
      </section>

      <footer className="footer">
        <p>Built for restaurants, agencies, and creators.</p>
      </footer>
    </main>
  );
}
