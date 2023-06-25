import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContextHook } from "../contextAPI/context/context";
import Rating from "../rating/Rating";

const MyProducts = () => {
  const { products, error, loading, handleAddToCart } = useGlobalContextHook();

  return (
    <div className="products">
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <small>{error}</small>
      ) : (
        products.map((product) => {
          return (
            <section
              className="product max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              key={product.slug}
            >
              <Link className="" to={`product/${product.slug} `}>
                <img
                  className="rounded-t-lg"
                  src={product.image}
                  alt={product.name}
                />
              </Link>
              <div className="product-info">
                <Link className="" to={`product/${product.slug}`}>
                  <h3>{product.name}</h3>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  <strong> N{product.price}</strong>
                </p>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />

                {product.countInStock === 0 ? (
                  <button className="outtaStock" disabled>
                    Outta stock
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add to cart
                  </button>
                )}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
};

export default MyProducts;
