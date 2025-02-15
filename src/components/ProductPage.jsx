import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Stars from './Stars.jsx';
import styles from '../style/ProductPage.module.css';

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
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
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
