import { useState, useEffect, useRef } from 'react';
import FilterDialog from '../components/FilterDialog.jsx';
import Querybar from '../components/Querybar.jsx';
import Card from '../components/Card.jsx';
import backendFetch from '../helpers/backendFetch';
import styles from '../style/Shop.module.css';

export default function Shop() {
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState('');
  const filterModal = useRef(null);

  const [filters, setFilters] = useState({
    category: 'all',
    rating: 0,
    minPrice: 0,
    maxPrice: 10000,
  });

  useEffect(() => {
    setError(null);

    backendFetch('/products', { hasBearer: false })
      .then((response) => setProducts(response.products))
      .catch((err) => setError(err));
  }, []);

  async function updateProducts(queryParams) {
    const response = await backendFetch(`/products?${queryParams}`, {
      hasBearer: false,
    });
    setProducts(response.products);
  }

  function buildQueryParams(newFilters, newSearch, newSort) {
    const { category, rating, minPrice, maxPrice } = newFilters;
    return `category=${category}&rating=${rating}&minPrice=${minPrice}&maxPrice=${maxPrice}&search=${newSearch}&sort=${newSort}`;
  }

  function handleFiltersChange(newFilters) {
    setFilters(newFilters);
    updateProducts(buildQueryParams(newFilters, searchQuery, sort));
  }

  function handleSearchChange(newSearch) {
    setSearchQuery(newSearch);
    updateProducts(buildQueryParams(filters, newSearch, sort));
  }

  function handleSortChange(newSort) {
    setSort(newSort);
    updateProducts(buildQueryParams(filters, searchQuery, newSort));
  }

  function renderProducts() {
    if (error) {
      return <h1 className='loading'>{error.message}</h1>;
    }

    if (!products) {
      return <h1 className='loading'>Loading...</h1>;
    }

    return products.map((product) => (
      <Card product={product} key={product._id} />
    ));
  }

  return (
    <main>
      <div className={styles.shop}>
        <FilterDialog
          handleFiltersChange={handleFiltersChange}
          filterModal={filterModal}
        />
        <Querybar
          handleSearchChange={handleSearchChange}
          handleSortChange={handleSortChange}
          filterModal={filterModal}
        />
        <div className={styles.cardContainer}>{renderProducts()}</div>
      </div>
    </main>
  );
}
