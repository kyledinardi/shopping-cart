import PropTypes from 'prop-types';
import Stars from './Stars';
import styles from '../style/Card.module.css';

function Card({ product, addToCart }) {
  function handleSubmit(e) {
    e.preventDefault();
    addToCart(document.getElementById('quantity').value);
    e.target.reset();
  }

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
      <form className={styles.purchase} onSubmit={handleSubmit}>
        <label htmlFor='quantity'>Quantity:</label>
        <input
          type='number'
          name='quantity'
          id='quantity'
          className={styles.quantityInput}
          defaultValue={0}
          min={0}
          max={99}
        />
        <button type='submit'>Add to Cart</button>
      </form>
    </div>
  );
}

Card.propTypes = {
  product: PropTypes.object,
  addToCart: PropTypes.func,
};

export default Card;
