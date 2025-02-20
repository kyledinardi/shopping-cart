import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar.jsx';

function App() {
  const [cartContents, setCartContents] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  function modifyCart(product, quantityDelta) {
    let newCartContents;

    const productInCart = cartContents.find(
      (cartItem) => cartItem._id === product._id,
    );

    if (productInCart) {
      if (productInCart.quantity + quantityDelta === 0) {
        newCartContents = cartContents.filter(
          (cartItem) => cartItem._id !== product._id,
        );
      } else {
        newCartContents = cartContents.map((cartItem) => {
          if (cartItem._id === product._id) {
            return { ...cartItem, quantity: cartItem.quantity + quantityDelta };
          }

          return cartItem;
        });
      }
    } else {
      newCartContents = [
        ...cartContents,
        { ...product, quantity: quantityDelta },
      ];
    }

    setCartContents(newCartContents);
    setTotalQuantity(totalQuantity + quantityDelta);
  }

  return (
    <>
      <Navbar totalQuantity={totalQuantity} />
      <Outlet context={[modifyCart, cartContents, totalQuantity]} />
    </>
  );
}

export default App;
