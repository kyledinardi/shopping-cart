import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Stars from './Stars.jsx';
import styles from '../style/Card.module.css';

function Card({ product }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Link to={`/products/${product.id}`}>
          <img src={product.image} alt={product.title} />
        </Link>
      </div>
      <div className={styles.info}>
        <h2>
          <Link to={`/products/${product.id}`} className={styles.productTitle}>
            {product.title}
          </Link>
        </h2>
        <div className={styles.rating}>
          <p>{product.rating.rate}</p>
          <Stars rating={product.rating.rate} />
          <p className={styles.ratingCount}>({product.rating.count})</p>
        </div>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}

Card.propTypes = { product: PropTypes.object };
export default Card;
