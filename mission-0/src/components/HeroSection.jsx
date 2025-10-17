import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Lorem ipsum dolor sit amet</h1>
        <div className="hero-image"></div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>
      </div>
    </section>
  );
}
