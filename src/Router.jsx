import App from './App';
import Home from './components/Home';
import Shop from './components/Shop';
import ErrorPage from './components/ErrorPage';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'shop', element: <Shop /> },
    ],
    errorElement: <ErrorPage />,
  },
];

export default routes;
