import { json, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import backendFetch from './helpers/backendFetch';

function App() {
  const [cartContents, setCartContents] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      backendFetch('/users/current-user').then((response) => {
        setCartContents(response.user.cart);
        setTotalQuantity(response.user.totalCartQuantity);
      });
    }
  }, []);

  async function updateCart(product, quantityDelta) {
    const response = await backendFetch('/users/cart', {
      method: 'PUT',
      body: JSON.stringify({ productId: product._id, quantityDelta }),
    });

    setCartContents(response.cart);
    setTotalQuantity(response.totalQuantity);
  }

  return (
    <>
      <Navbar totalQuantity={totalQuantity} />
      <Outlet context={[updateCart, cartContents, totalQuantity]} />
      <Footer />
    </>
  );
}

export default App;
