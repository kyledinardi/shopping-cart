import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Stars from './Stars.jsx';
import styles from '../style/Card.module.css';

function Card({ product }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Link to={`/products/${product._id}`}>
          <img src={product.image} alt={product.title} />
        </Link>
      </div>
      <div className={styles.info}>
        <h2>
          <Link to={`/products/${product._id}`} className={styles.productTitle}>
            {product.title}
          </Link>
        </h2>
        <div className={styles.rating}>
          {product.ratingCount > 0 ? (
            <>
              <p>{Math.round(product.averageRating * 10) / 10}</p>
              <Stars rating={product.averageRating} />
              <p className={styles.ratingCount}>({product.ratingCount})</p>
            </>
          ) : (
            <p>No ratings</p>
          )}
        </div>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}

Card.propTypes = { product: PropTypes.object };
export default Card;
