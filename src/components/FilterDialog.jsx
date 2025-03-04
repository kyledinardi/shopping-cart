import PropTypes from 'prop-types';
import styles from '../style/FilterDialog.module.css';

function FilterDialog({ handleFiltersChange, filterModal }) {
  async function handleSubmit() {
    const filters = {
      category: document.getElementById('category').value,
      rating: document.getElementById('rating').value,
      minPrice: document.getElementById('minPrice').value || 0,
      maxPrice: document.getElementById('maxPrice').value || 10000,
    };

    handleFiltersChange(filters);
  }

  function handleReset() {
    const filters = {
      category: 'all',
      rating: 0,
      minPrice: 0,
      maxPrice: 10000,
    };
    handleFiltersChange(filters);
    document.querySelector('form').reset();
    document.querySelector('dialog').close();
  }

  return (
    <dialog ref={filterModal} className={styles.dialog}>
      <button
        className={styles.closeButton}
        onClick={() => filterModal.current.close()}
      >
        <span className='material-symbols-outlined'>close</span>
      </button>
      <form
        className={styles.form}
        method='dialog'
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <div className={styles.fields}>
          <label className={styles.label} htmlFor='category'>
            Category
          </label>
          <select className={styles.input} name='category' id='category'>
            <option value='all'>All Categories</option>
            <option value="men's clothing">Men&apos;s Clothing</option>
            <option value="women's clothing">Women&apos;s Clothing</option>
            <option value='jewelery'>Jewelry</option>
            <option value='electronics'>Electronics</option>
          </select>
          <label className={styles.label} htmlFor='rating'>
            Minimum Rating
          </label>
          <div className={styles.input}>
            <input
              type='range'
              name='rating'
              id='rating'
              min={0}
              max={5}
              step={0.1}
              defaultValue={0}
              onInput={(e) => {
                const value = Number(e.target.value).toFixed(1);
                document.querySelector('output').value = value;
              }}
            />
            <output>0.0</output>
          </div>
          <p className={styles.label}>Price Range</p>
          <div className={`${styles.input} ${styles.priceInputs}`}>
            <label htmlFor='minPrice'>Min: $</label>
            <input type='number' name='minPrice' id='minPrice' min={0} />
            <label htmlFor='maxPrice'>Max: $</label>
            <input type='number' name='maxPrice' id='maxPrice' min={0} />
          </div>
        </div>
        <div className={styles.buttons}>
          <button className={`bigButton ${styles.filterButton}`} type='submit'>
            Filter
          </button>
          <button className={`bigButton ${styles.filterButton}`} type='reset'>
            Remove All Filters
          </button>
        </div>
      </form>
    </dialog>
  );
}

FilterDialog.propTypes = {
  handleFiltersChange: PropTypes.func,
  filterModal: PropTypes.object,
};
export default FilterDialog;
