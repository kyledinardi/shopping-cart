import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import Stars from './Stars.jsx';
import styles from '../style/ProductPage.module.css';

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useOutletContext();
  const productId = Number(useParams().productId);

  useEffect(() => {
    if (!productId) {
      setError({ message: '404: product not found' });
    } else {
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((responseStream) => {
          if (responseStream.status >= 400) {
            throw new Error(`${responseStream.status} error`);
          }

          return responseStream.json();
        })

        .then((response) => setProduct(response))
        .catch((err) => setError(err));
    }
  }, [productId]);

  function handleSubmit(e) {
    e.preventDefault();
    addToCart(document.getElementById(`${product.id}-quantity`).value);
    e.target.reset();
  }

  function handleQuantityChange(e) {
    const newQuantity = Number(e.target.value);

    if (!Number.isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles.wrapper}>
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
            <label htmlFor={`${product.id}-quantity`}>Quantity:</label>
            <div className={styles.quantity}>
              <button
                type='button'
                disabled={quantity <= 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <input
                type='tel'
                name='quantity'
                id={`${product.id}-quantity`}
                className={styles.quantityInput}
                value={quantity}
                onChange={handleQuantityChange}
                maxLength={2}
              />
              <button
                type='button'
                disabled={quantity >= 99}
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button className={styles.addToCartButton}>Add to Cart</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
