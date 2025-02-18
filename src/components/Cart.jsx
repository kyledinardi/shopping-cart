import { Link, useOutletContext } from 'react-router-dom';
import CartItem from './CartItem.jsx';
import styles from '../style/Cart.module.css';

function Cart() {
  const [, cartContents, totalQuantity] = useOutletContext();

  function computeSubtotal() {
    return cartContents.reduce(
      (subtotal, cartItem) => subtotal + cartItem.price * cartItem.quantity,
      0,
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.cartPage}>
        {cartContents.length === 0 ? (
          <>
            <h2>Your Cart is Empty</h2>
            <button className={styles.shopButton}>
              <Link to='/shop'>Shop Now</Link>
            </button>
          </>
        ) : (
          <>
            <h1>Your Cart</h1>
            {cartContents.map((cartItem) => (
              <CartItem key={cartItem.id} product={cartItem} />
            ))}
            <h2>
              Subtotal({totalQuantity} items): ${computeSubtotal().toFixed(2)}
            </h2>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
