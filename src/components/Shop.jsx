import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import FilterDialog from './FilterDialog.jsx';
import Querybar from './Querybar.jsx';
import Card from './Card.jsx';
import styles from '../style/Shop.module.css';

export default function Shop() {
  const addToCart = useOutletContext();
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

    fetch('https://fakestoreapi.com/products', { mode: 'cors' })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(`${res.status} error`);
        }

        return res.json();
      })

      .then((json) => {
        const sorted = json.sort((a, b) =>
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
      const isInSearch = product.title.toLowerCase().includes(filters.search);
      const isInCategory =
        product.category === filters.category || filters.category === 'all';
      const isRating = product.rating.rate >= filters.rating;
      const isMinPrice = product.price >= filters.minPrice;
      const isMaxPrice = product.price <= filters.maxPrice;
      return isInSearch && isInCategory && isRating && isMinPrice && isMaxPrice;
    });

    return filteredProducts;
  }

  function renderProducts() {
    if (products) {
      return filterProducts().map((product) => (
        <Card
          product={product}
          addToCart={(q) => addToCart(q)}
          key={product.id}
        />
      ));
    }

    if (!error) {
      return <h1 className={styles.loading}>Loading...</h1>;
    }

    return <h1 className={styles.loading}>{error.message}</h1>;
  }

  return (
    <div className={styles.shop}>
      <FilterDialog handleFilters={handleFilters} />
      <Querybar onSearch={handleSearch} onSelectSort={handleSort} />
      <div className={styles.cardContainer}>{renderProducts()}</div>
    </div>
  );
}
