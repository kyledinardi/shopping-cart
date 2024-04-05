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
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <title>magnify</title>
            <path d='M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z' />
          </svg>
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
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <title>filter</title>
            <path d='M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.06,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z' />
          </svg>
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
