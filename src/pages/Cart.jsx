import { useRef } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import CartItem from '../components/CartItem.jsx';
import backendFetch from '../helpers/backendFetch';
import styles from '../style/Cart.module.css';

function Cart() {
  const popup = useRef(null);
  const [, cartContents, totalQuantity] = useOutletContext();

  function computeSubtotal() {
    return cartContents
      .reduce(
        (subtotal, cartItem) =>
          subtotal + cartItem.product.price * cartItem.quantity,
        0,
      )

      .toFixed(2);
  }

  async function checkout() {
    await backendFetch('/products/checkout', {
      method: 'PUT',
      body: JSON.stringify({ cartContents }),
    });
  }

  return (
    <main className={styles.wrapper}>
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
            <button className={`bigLinkButton ${styles.shopButton}`}>
              <Link to='/shop'>Shop Now</Link>
            </button>
          </>
        ) : (
          <>
            <h1>Your Cart</h1>
            <div>
              {cartContents.map((cartItem) => (
                <CartItem key={cartItem._id} cartItem={cartItem} />
              ))}
            </div>
            <h2>
              Subtotal({totalQuantity} items): ${computeSubtotal()}
            </h2>
            <button
              className={`bigButton ${styles.checkoutButton}`}
              onClick={() => {
                checkout();
                popup.current.showModal();
              }}
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default Cart;
