import { Link, useParams } from "react-router-dom";
import products from "../data/products.js";

function ProductDetails({ addToCart }) {

  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="not-found">
        <h1>Product Not Found</h1>

        <Link
          to="/products"
          className="primary-btn"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <section className="details-page">

      <div className="details-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="details-content">

        <span className="category">
          {product.category}
        </span>

        <h1>{product.name}</h1>

        <div className="rating">
          ⭐ {product.rating} / 5
        </div>

        <h2>
          ₹{product.price.toLocaleString("en-IN")}
        </h2>

        <p className="description">
          {product.description}
        </p>

        <button
          className="cart-btn large-btn"
          onClick={() => addToCart(product)}
        >
          🛒 Add to Cart
        </button>

        <br />

        <Link
          to="/products"
          className="back-link"
        >
          ← Back to Products
        </Link>

      </div>

    </section>
  );
}

export default ProductDetails;