import App from './App.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Cart from './pages/Cart.jsx';
import ProductPage from './pages/ProductPage.jsx';
import Login from './pages/Login.jsx';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/shop', element: <Shop /> },
      { path: '/cart', element: <Cart /> },
      { path: '/products/:productId', element: <ProductPage /> },
    ],
    errorElement: <ErrorPage />,
  },

  { path: '/login', element: <Login />, errorElement: <ErrorPage /> },
];

export default routes;
