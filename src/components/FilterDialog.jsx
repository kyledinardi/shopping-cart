import PropTypes from 'prop-types';
import styles from '../style/FilterDialog.module.css';

function FilterDialog({ handleFilters }) {
  function handleSubmit() {
    const newFilters = {};
    newFilters.category = document.getElementById('category').value;
    newFilters.rating = document.getElementById('rating').value;
    newFilters.minPrice = document.getElementById('minPrice').value;
    newFilters.maxPrice = document.getElementById('maxPrice').value;

    if (newFilters.minPrice === '') {
      newFilters.minPrice = 0;
    }

    if (newFilters.maxPrice === '') {
      newFilters.maxPrice = 10000;
    }

    handleFilters(newFilters);
  }

  function handleReset() {
    const newFilters = {
      category: 'all',
      rating: 0,
      minPrice: 0,
      maxPrice: 10000,
    };

    handleFilters(newFilters);
    document.querySelector('dialog').close();
  }

  return (
    <dialog className={styles.dialog}>
      <form
        className={styles.form}
        method='dialog'
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <div className={styles.fields}>
          <label htmlFor='category'>Category</label>
          <select name='category' id='category'>
            <option value='all'>All Categories</option>
            <option value="men's clothing">Men&apos;s Clothing</option>
            <option value="women's clothing">Women&apos;s Clothing</option>
            <option value='jewelery'>Jewelry</option>
            <option value='electronics'>Electronics</option>
          </select>
          <label htmlFor='rating'>Minimum Rating</label>
          <div className={styles.rangeInput}>
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
          <p className={styles.priceRange}>Price Range</p>
          <div className={styles.priceInputs}>
            <label htmlFor='minPrice'>Min: $</label>
            <input type='number' name='minPrice' id='minPrice' min={0} />
            <label htmlFor='maxPrice'>Max: $</label>
            <input type='number' name='maxPrice' id='maxPrice' min={0} />
          </div>
        </div>
        <div className={styles.buttons}>
          <button type='submit'>Filter</button>
          <button type='reset'>Remove All Filters</button>
        </div>
      </form>
    </dialog>
  );
}

FilterDialog.propTypes = { handleFilters: PropTypes.func };
export default FilterDialog;
