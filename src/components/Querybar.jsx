import PropTypes from 'prop-types';
import styles from '../style/Querybar.module.css';

function Querybar({ onSelectSort, onSearch }) {
  function handleSearch(e) {
    onSearch(e.target.value);
  }

  function handleSort(e) {
    onSelectSort(e.target.value);
  }

  function handleFilter() {
    document.querySelector('dialog').showModal();
  }

  return (
    <div className={styles.querybar}>
      <div className={styles.search}>
        <label htmlFor='search'>
          <span className='material-symbols-outlined'>search</span>
        </label>
        <input
          type='search'
          name='search'
          id='search'
          onChange={handleSearch}
        />
      </div>
      <div className={styles.filter}>
        <p>Filter: </p>
        <button onClick={handleFilter}>
          <span className='material-symbols-outlined'>filter_alt</span>
        </button>
      </div>
      <div className={styles.sort}>
        <label htmlFor='sort'>Sort by: </label>
        <select name='sort' id='sort' onChange={handleSort}>
          <option value='rating'>Highest Rated</option>
          <option value='priceAsc'>Price (Low to High)</option>
          <option value='priceDes'>Price (High to Low)</option>
        </select>
      </div>
    </div>
  );
}

Querybar.propTypes = {
  onSelectSort: PropTypes.func,
  onSearch: PropTypes.func,
};

export default Querybar;
