import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../style/Navbar.module.css';

function Navbar({ totalQuantity }) {
  const navigate = useNavigate();

  function logOut() {
    localStorage.clear();
    navigate('/');
  }

  return (
    <div className={styles.navWrapper}>
      <nav className={styles.nav}>
        <Link to='/' className={styles.logo}>
          Shopamajig
        </Link>
        <ul>
          <li>
            <Link to='shop'>
              <button>Shop</button>
            </Link>
          </li>
          {localStorage.getItem('token') ? (
            <>
              <li>
                <Link to='/cart'>
                  <button>
                    <span className='material-symbols-outlined'>
                      shopping_cart
                    </span>
                    <span>{totalQuantity}</span>
                  </button>
                </Link>
              </li>
              <li>
                <button onClick={logOut}>Log Out</button>
              </li>
            </>
          ) : (
            <Link to='/login'>
              <button>Log In</button>
            </Link>
          )}
        </ul>
      </nav>
    </div>
  );
}

Navbar.propTypes = { totalQuantity: PropTypes.number };
export default Navbar;
