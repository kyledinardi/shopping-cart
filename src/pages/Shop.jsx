import { useState, useEffect } from 'react';
import FilterDialog from '../components/FilterDialog.jsx';
import Querybar from '../components/Querybar.jsx';
import Card from '../components/Card.jsx';
import backendFetch from '../helpers/backendFetch';
import styles from '../style/Shop.module.css';

export default function Shop() {
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);

  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    rating: 0,
    minPrice: 0,
    maxPrice: 10000,
  });

  useEffect(() => {
    setError(null);

    backendFetch('/products', { hasBearer: false })
      .then((response) => {
        const sorted = response.sort((a, b) =>
          a.rating.rate > b.rating.rate ? -1 : 1,
        );

        setProducts(sorted);
      })

      .catch((err) => setError(err));
  }, []);

  function handleSort(sortType) {
    const newProducts = [...products];

    if (sortType === 'rating') {
      newProducts.sort((a, b) => (a.rating.rate > b.rating.rate ? -1 : 1));
    }

    if (sortType === 'priceAsc') {
      newProducts.sort((a, b) => (a.price > b.price ? 1 : -1));
    }

    if (sortType === 'priceDes') {
      newProducts.sort((a, b) => (a.price > b.price ? -1 : 1));
    }

    setProducts(newProducts);
  }

  function handleSearch(query) {
    setFilters({ ...filters, search: query.toLowerCase() });
  }

  function handleFilters(newFilters) {
    setFilters({
      ...filters,
      category: newFilters.category,
      rating: newFilters.rating,
      minPrice: newFilters.minPrice,
      maxPrice: newFilters.maxPrice,
    });
  }

  function filterProducts() {
    const filteredProducts = products.filter((product) => {
      const isRating = product.rating.rate >= filters.rating;
      const isMinPrice = product.price >= filters.minPrice;
      const isMaxPrice = product.price <= filters.maxPrice;

      const isInCategory =
        product.category === filters.category || filters.category === 'all';

      const isInSearch =
        product.title.toLowerCase().includes(filters.search) ||
        product.description.toLowerCase().includes(filters.search);

      return isRating && isMinPrice && isMaxPrice && isInSearch && isInCategory;
    });

    return filteredProducts;
  }

  function renderProducts() {
    if (error) {
      return <h1 className={styles.loading}>{error.message}</h1>;
    }

    if (!products) {
      return <h1 className={styles.loading}>Loading...</h1>;
    }

    return filterProducts().map((product) => (
      <Card product={product} key={product._id} />
    ));
  }

  return (
    <main>
      <div className={styles.shop}>
        <FilterDialog handleFilters={handleFilters} />
        <Querybar onSearch={handleSearch} onSelectSort={handleSort} />
        <div className={styles.cardContainer}>{renderProducts()}</div>
      </div>
    </main>
  );
}
