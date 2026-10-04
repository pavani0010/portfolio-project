import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">

      <div className="hero-content">

        <span className="hero-badge">
          ✨ Welcome to ShopEase
        </span>

        <h1>
          Everything You Need,
          <br />
          All in One Place.
        </h1>

        <p>
          Discover quality electronics, fashion and
          accessories at affordable prices.
        </p>

        <Link
          to="/products"
          className="primary-btn"
        >
          Explore Products →
        </Link>

      </div>

    </section>
  );
}

export default Home;