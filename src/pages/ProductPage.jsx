import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import Stars from '../components/Stars.jsx';
import QuantityInput from '../components/QuanityInput.jsx';
import styles from '../style/ProductPage.module.css';

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [modifyCart] = useOutletContext();
  const { productId } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/products/${productId}`)
      .then((responseStream) => {
        if (responseStream.status >= 400) {
          throw new Error(`${responseStream.status} error`);
        }

        return responseStream.json();
      })

      .then((response) => setProduct(response))
      .catch((err) => setError(err));
  }, [productId]);

  function handleSubmit(e) {
    e.preventDefault();
    modifyCart(product, quantity);
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <main>
      <div className={styles.productPage}>
        <img src={product.image} alt={product.title} />
        <div>
          <h2>{product.title}</h2>
          <div className={styles.rating}>
            <span className={styles.rating}>{product.rating.rate}</span>
            <Stars rating={product.rating.rate} />
            <span className={styles.ratingCount}>({product.rating.count})</span>
          </div>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <p>{product.description}</p>
          <form className={styles.purchase} onSubmit={handleSubmit}>
            <label htmlFor='quantity'>Quantity:</label>
            <QuantityInput quantity={quantity} setQuantity={setQuantity} />
            <button
              disabled={quantity === ''}
              className={styles.addToCartButton}
            >
              Add to Cart
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default ProductPage;
