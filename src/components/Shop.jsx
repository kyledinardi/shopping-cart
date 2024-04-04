import { useState, useEffect } from 'react';
import Card from './Card';
import Querybar from './Querybar';
import styles from '../style/Shop.module.css';

export default function Shop() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  return (
    <div className={styles.shop}>
      <Querybar />
      <div className={styles.cardContainer}>
        {products ? (
          products.map((product) => <Card product={product} key={product.id} />)
        ) : (
          <h1 className={styles.loading}>Loading...</h1>
        )}
      </div>
    </div>
  );
}
