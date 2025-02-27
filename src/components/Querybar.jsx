import PropTypes from 'prop-types';
import styles from '../style/Querybar.module.css';

function Querybar({ handleSearchChange, handleSortChange, filterModal }) {
  return (
    <div className={styles.querybar}>
      <div className={styles.search}>
        <label className={styles.searchLabel} htmlFor='search'>
          <span className='material-symbols-outlined'>search</span>
        </label>
        <input
          type='search'
          name='search'
          id='search'
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>
      <div className={styles.filter}>
        <span>Filter: </span>
        <button onClick={() => filterModal.current.showModal()}>
          <span className='material-symbols-outlined'>filter_alt</span>
        </button>
      </div>
      <div className={styles.sort}>
        <label htmlFor='sort'>Sort by: </label>
        <select
          name='sort'
          id='sort'
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value='rating-desc'>Highest Rated</option>
          <option value='price-asc'>Price (Low to High)</option>
          <option value='price-desc'>Price (High to Low)</option>
        </select>
      </div>
    </div>
  );
}

Querybar.propTypes = {
  handleSearchChange: PropTypes.func,
  handleSortChange: PropTypes.func,
  filterModal: PropTypes.object,
};
export default Querybar;
