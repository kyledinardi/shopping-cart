import PropTypes from 'prop-types';
import Stars from './Stars';
import styles from '../style/Card.module.css';

function Card({ product }) {
  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
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
};

export default Card;
