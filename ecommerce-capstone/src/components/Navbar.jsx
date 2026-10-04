import { Link } from "react-router-dom";

function Navbar({ cartCount }) {
  return (
    <header className="navbar">
      <div className="nav-container">

        <Link to="/" className="logo">
          Shop<span>Ease</span>
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>

          <Link to="/cart" className="cart-link">
            🛒 Cart
            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>

      </div>
    </header>
  );
}

export default Navbar;