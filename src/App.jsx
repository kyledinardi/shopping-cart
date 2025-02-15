import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar.jsx';

function App() {
  const [quantity, setQuantity] = useState(0);
  function addToCart(q) {
    setQuantity(Number(quantity) + Number(q));
  }

  return (
    <>
      <Navbar quantity={quantity} />
      <Outlet context={addToCart} />
    </>
  );
}

export default App;
