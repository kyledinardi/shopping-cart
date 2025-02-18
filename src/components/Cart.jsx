import { useOutletContext } from 'react-router-dom';
import CartItem from './CartItem.jsx';
import styles from '../style/Cart.module.css';

function Cart() {
  const [, cartContents, totalQuantity] = useOutletContext();

  function computeSubtotal() {
    return cartContents.reduce(
      (subtotal, cartItem) =>
        subtotal + cartItem.price * cartItem.quantity,
      0,
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.cartPage}>
        <h1>Your Cart</h1>
        <div className={styles.cart}>
          {cartContents.map((cartItem) => (
            <CartItem
              key={cartItem.id}
              product={cartItem}
            />
          ))}
        </div>
        <div>
          <h2>
            Subtotal({totalQuantity} items): ${computeSubtotal().toFixed(2)}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Cart;
