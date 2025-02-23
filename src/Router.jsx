import { redirect } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Cart from './pages/Cart.jsx';
import ProductPage from './pages/ProductPage.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      { index: true, element: <Home /> },
      { path: '/shop', element: <Shop /> },
      { path: '/products/:productId', element: <ProductPage /> },

      {
        path: '/cart',
        element: <Cart />,
        loader: () =>
          localStorage.getItem('token') ? null : redirect('/login'),
      },

      {
        path: '/login',
        element: <Login />,
        errorElement: <ErrorPage />,
        loader: () => (localStorage.getItem('token') ? redirect('/') : null),
      },
      
      {
        path: '/sign-up',
        element: <SignUp />,
        errorElement: <ErrorPage />,
        loader: () => (localStorage.getItem('token') ? redirect('/') : null),
      },
    ],
  },
];

export default routes;
