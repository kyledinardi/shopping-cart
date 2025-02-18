import PropTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';
import QuantityInput from './QuanityInput.jsx';
import styles from '../style/CartItem.module.css';

function CartItem({ product }) {
  const [modifyCart] = useOutletContext();

  return (
    <div className={styles.cartItem}>
      <img src={product.image} alt={product.title} />
      <div className={styles.titleAndQuantity}>
        <h2>{product.title}</h2>
        <QuantityInput
          quantity={product.quantity}
          setQuantity={(newQuantity) =>
            modifyCart(product, newQuantity - product.quantity)
          }
        />
      </div>
      <p>${(product.price * product.quantity).toFixed(2)}</p>
      <button
        className={styles.deleteButton}
        onClick={() => modifyCart(product, -product.quantity)}
      >
        <span className='material-symbols-outlined'>delete</span>
      </button>
    </div>
  );
}

CartItem.propTypes = { product: PropTypes.object };
export default CartItem;
