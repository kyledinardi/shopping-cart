import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Stars from './Stars.jsx';
import styles from '../style/Card.module.css';

function Card({ product }) {
  return (
    <div className={styles.card}>
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.title} />
      </Link>
      <h2>
        <Link to={`/products/${product.id}`}>{product.title}</Link>
      </h2>
      <div className={styles.rating}>
        <p>{product.rating.rate}</p>
        <Stars rating={product.rating.rate} />
        <p className={styles.ratingCount}>({product.rating.count})</p>
      </div>
      <p className={styles.price}>${product.price.toFixed(2)}</p>
    </div>
  );
}

Card.propTypes = {
  product: PropTypes.object,
  addToCart: PropTypes.func,
};

export default Card;
