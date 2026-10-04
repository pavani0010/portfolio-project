import { Link } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  return (
    <article className="product-card">

      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
      </div>

      <div className="product-content">

        <span className="category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <p className="rating">
          ⭐ {product.rating}
        </p>

        <h2>
          ₹{product.price.toLocaleString("en-IN")}
        </h2>

        <div className="card-buttons">

          <Link
            to={`/products/${product.id}`}
            className="details-btn"
          >
            View Details
          </Link>

          <button
            className="cart-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

        </div>

      </div>
    </article>
  );
}

export default ProductCard;