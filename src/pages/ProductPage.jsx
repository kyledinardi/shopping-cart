import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import Stars from '../components/Stars.jsx';
import QuantityInput from '../components/QuanityInput.jsx';
import backendFetch from '../helpers/backendFetch';
import styles from '../style/ProductPage.module.css';

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [updateCart] = useOutletContext();
  const { productId } = useParams();

  useEffect(() => {
    backendFetch(`/products/${productId}`, { hasBearer: false })
      .then((response) => setProduct(response.product))
      .catch((err) => setError(err));

    if (localStorage.getItem('token')) {
      backendFetch(`/ratings/${productId}`).then((response) =>
        setUserRating(response),
      );
    }
  }, [productId]);

  function handleSubmit(e) {
    e.preventDefault();
    updateCart(product, quantity);
  }

  async function handleRatingChange() {
    const rating = document.getElementById('rating').value;
    const isRated = rating !== 'unrated';

    const response = await backendFetch(`/ratings`, {
      method: isRated ? 'PUT' : 'DELETE',
      body: JSON.stringify({ productId, rating: isRated ? rating : undefined }),
    });

    setProduct(response.product);
  }

  if (error) {
    return <h1 className='loading'>{error.message}</h1>;
  }

  if (!product) {
    return <h1 className='loading'>Loading...</h1>;
  }

  return (
    <main>
      <div className={styles.productPage}>
        <img src={product.image} alt={product.title} />
        <div>
          <h2>{product.title}</h2>
          <div className={styles.rating}>
            {product.ratingCount > 0 ? (
              <>
                <span className={styles.rating}>
                  {Math.round(product.averageRating * 10) / 10}
                </span>
                <Stars rating={product.averageRating} />
                <span className={styles.ratingCount}>
                  ({product.ratingCount})
                </span>
              </>
            ) : (
              <p>No ratings</p>
            )}
          </div>
          {localStorage.getItem('token') && (
            <>
              <label htmlFor='rating'>Rate This Product </label>
              <select
                defaultValue={userRating ? userRating.rate : 'unrated'}
                onChange={handleRatingChange}
                name='rating'
                id='rating'
              >
                <option value='unrated'>Select a rating</option>
                <option value='0'>0 Stars</option>
                <option value='1'>1 Star</option>
                <option value='2'>2 Stars</option>
                <option value='3'>3 Stars</option>
                <option value='4'>4 Stars</option>
                <option value='5'>5 Stars</option>
              </select>
            </>
          )}
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <p>{product.description}</p>
          {localStorage.getItem('token') && (
            <form className={styles.purchase} onSubmit={handleSubmit}>
              <label htmlFor='quantity'>Quantity:</label>
              <QuantityInput quantity={quantity} setQuantity={setQuantity} />
              <button className='bigButton' disabled={quantity === 0}>
                Add to Cart
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

export default ProductPage;
