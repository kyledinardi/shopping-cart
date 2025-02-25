import PropTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';
import QuantityInput from './QuanityInput.jsx';
import styles from '../style/CartItem.module.css';

function CartItem({ cartItem }) {
  const [updateCart] = useOutletContext();

  return (
    <div className={styles.cartItem}>
      <img src={cartItem.product.image} alt={cartItem.product.title} />
      <div className={styles.titleAndQuantity}>
        <h2>{cartItem.product.title}</h2>
        <QuantityInput
          quantity={cartItem.quantity}
          setQuantity={(newQuantity) =>
            updateCart(cartItem.product, newQuantity - cartItem.quantity)
          }
        />
      </div>
      <p>${(cartItem.product.price * cartItem.quantity).toFixed(2)}</p>
      <button
        className={styles.deleteButton}
        onClick={() => updateCart(cartItem.product, -cartItem.quantity)}
      >
        <span className='material-symbols-outlined'>delete</span>
      </button>
    </div>
  );
}

CartItem.propTypes = { cartItem: PropTypes.object };
export default CartItem;
