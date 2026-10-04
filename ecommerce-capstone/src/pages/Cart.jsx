import { Link } from "react-router-dom";

function Cart({ cart, removeFromCart }) {

  const total = cart.reduce(
    (sum, product) => sum + product.price,
    0
  );

  return (
    <section className="cart-page">

      <div className="page-heading">
        <span>SHOPPING CART</span>
        <h1>Your Cart</h1>
      </div>

      {cart.length === 0 ? (

        <div className="empty-cart">

          <div className="empty-icon">
            🛒
          </div>

          <h2>Your cart is empty</h2>

          <p>
            Add some products to your cart.
          </p>

          <Link
            to="/products"
            className="primary-btn"
          >
            Start Shopping
          </Link>

        </div>

      ) : (

        <>

          <div className="cart-items">

            {cart.map((product, index) => (

              <div
                className="cart-item"
                key={`${product.id}-${index}`}
              >

                <img
                  src={product.image}
                  alt={product.name}
                />

                <div className="cart-info">

                  <h3>{product.name}</h3>

                  <p>{product.category}</p>

                  <strong>
                    ₹{product.price.toLocaleString("en-IN")}
                  </strong>

                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

          <div className="cart-summary">

            <h2>
              Total:
              ₹{total.toLocaleString("en-IN")}
            </h2>

            <button
              className="checkout-btn"
              onClick={() =>
                alert(
                  "Checkout feature will be available soon!"
                )
              }
            >
              Proceed to Checkout
            </button>

          </div>

        </>

      )}

    </section>
  );
}

export default Cart;