import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../style/Navbar.module.css';

function Navbar({ totalQuantity }) {
  return (
    <div className={styles.navWrapper}>
      <nav className={styles.nav}>
        <Link to='/' className={styles.logo}>
          Shopamajig
        </Link>
        <ul>
          <li>
            <Link to='/'>
              <button>Home</button>
            </Link>
          </li>
          <li>
            <Link to='shop'>
              <button>Shop</button>
            </Link>
          </li>
          <li>
            <Link to='/cart'>
              <button>
                <span className='material-symbols-outlined'>shopping_cart</span>
                <span>{totalQuantity}</span>
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

Navbar.propTypes = { totalQuantity: PropTypes.number };
export default Navbar;
