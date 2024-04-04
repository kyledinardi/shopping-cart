import { useState, useEffect } from 'react';
import Card from './Card';
import Querybar from './Querybar';
import styles from '../style/Shop.module.css';

export default function Shop() {
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => {
        const sorted = json.sort((a, b) => {
          return a.rating.rate > b.rating.rate ? -1 : 1;
        });

        setProducts(sorted);
        setFilteredProducts(sorted);
        setSearch(sorted);
      });
  }, []);

  function handleSearch(query) {
    const newFiltered = [...filteredProducts].filter((product) => {
      const productName = product.title.toLowerCase();
      return productName.includes(query.toLowerCase());
    });

    setSearch(newFiltered);
  }

  function handleSort(sortType) {
    const newProducts = [...products];

    if (sortType === 'rating') {
      newProducts.sort((a, b) => {
        return a.rating.rate > b.rating.rate ? -1 : 1;
      });
    }
    if (sortType === 'priceAsc') {
      newProducts.sort((a, b) => {
        return a.price > b.price ? 1 : -1;
      });
    }
    if (sortType === 'priceDes') {
      newProducts.sort((a, b) => {
        return a.price > b.price ? -1 : 1;
      });
    }

    setProducts(newProducts);
  }

  return (
    <div className={styles.shop}>
      <Querybar onSearch={handleSearch} onSelectSort={handleSort} />
      <div className={styles.cardContainer}>
        {products ? (
          search.map((product) => <Card product={product} key={product.id} />)
        ) : (
          <h1 className={styles.loading}>Loading...</h1>
        )}
      </div>
    </div>
  );
}
