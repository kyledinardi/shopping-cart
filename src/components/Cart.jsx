import { useRef } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import CartItem from './CartItem.jsx';
import styles from '../style/Cart.module.css';

function Cart() {
  const popup = useRef(null);
  const [, cartContents, totalQuantity] = useOutletContext();

  function computeSubtotal() {
    return cartContents
      .reduce(
        (subtotal, cartItem) => subtotal + cartItem.price * cartItem.quantity,
        0,
      )
      
      .toFixed(2);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.cartPage}>
        <dialog ref={popup} className={styles.popup}>
          <button onClick={() => popup.current.close()}>
            <span className='material-symbols-outlined'>close</span>
          </button>
          <h3>Checkout successful</h3>
        </dialog>
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
            <div>
              {cartContents.map((cartItem) => (
                <CartItem key={cartItem._id} product={cartItem} />
              ))}
            </div>
            <h2>
              Subtotal({totalQuantity} items): ${computeSubtotal()}
            </h2>
            <button
              className={styles.checkoutButton}
              onClick={() => popup.current.showModal()}
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
