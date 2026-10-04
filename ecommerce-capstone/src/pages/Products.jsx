import { useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products.js";

function Products({ addToCart }) {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Accessories"
  ];

  const filteredProducts = products.filter((product) => {

    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" ||
      product.category === category;

    return searchMatch && categoryMatch;
  });

  return (
    <section className="products-page">

      <div className="page-heading">
        <span>OUR COLLECTION</span>
        <h1>Explore Products</h1>
        <p>
          Find high-quality products for your everyday needs.
        </p>
      </div>

      <div className="filters">

        <input
          type="search"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

      </div>

      <div className="product-grid">

        {filteredProducts.length > 0 ? (

          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))

        ) : (

          <div className="no-products">
            <h2>No products found</h2>
            <p>Try another search.</p>
          </div>

        )}

      </div>

    </section>
  );
}

export default Products;