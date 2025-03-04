import { redirect } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import NewProductForm from './pages/NewProductForm.jsx';
import Cart from './pages/Cart.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';

function loader(shouldBeLoggedIn) {
  if (shouldBeLoggedIn) {
    return localStorage.getItem('token') ? null : redirect('/login');
  }

  return localStorage.getItem('token') ? redirect('/') : null;
}

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
        path: '/new-product',
        element: <NewProductForm />,
        loader: () => loader(true),
      },

      {
        path: '/cart',
        element: <Cart />,
        loader: () => loader(true),
      },

      {
        path: '/login',
        element: <Login />,
        errorElement: <ErrorPage />,
        loader: () => loader(false),
      },

      {
        path: '/sign-up',
        element: <SignUp />,
        errorElement: <ErrorPage />,
        loader: () => loader(false),
      },
    ],
  },
];

export default routes;
