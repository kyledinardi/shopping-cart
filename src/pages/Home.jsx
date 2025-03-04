import { Link } from 'react-router-dom';
import styles from '../style/Home.module.css';
import maleClothingImage from '../assets/frames-for-your-heart-OnELxjs2mBc-unsplash.webp';
import femaleClothingImage from '../assets/vasilis-caravitis-KhWNxsFWU84-unsplash.webp';
import jewelryImage from '../assets/nataliya-melnychuk-oO0JAOJhquk-unsplash.webp';
import electronicsImage from '../assets/mohammadreza-alidoost-0rUp9vgyEYo-unsplash.webp';

export default function Home() {
  return (
    <main>
      <div className={styles.home}>
        <div className={styles.hero}>
          <h1>Welcome to Shopamajig, the premiere ecommerce site!</h1>
          <p>
            Explore a world of premium clothing, timeless jewelry, and
            cutting-edge electronics. Whether you&apos;re refreshing your
            wardrobe, adding a touch of sparkle, or upgrading your tech game,
            we&apos;ve got you covered. Discover top-quality products, exclusive
            deals, and fast delivery - all at unbeatable prices.
          </p>
          <div className={styles.buttons}>
            <button className='bigLinkButton'>
              <Link to='/shop'>Shop Now</Link>
            </button>
            {localStorage.getItem('token') && (
              <button className='bigLinkButton'>
                <Link to='/new-product'>Suggest a Product</Link>
              </button>
            )}
          </div>
        </div>
        <div className={styles.categories}>
          <img src={maleClothingImage} alt="Trendy men's clothing" />
          <div className={styles.categoryText}>
            <h2>The Ultimate Wardrobe Refresh for Men</h2>
            <p>
              Discover a wide range of stylish and comfortable clothing for men.
              From everyday wear to sophisticated pieces, we have everything to
              suit your taste.
            </p>
          </div>
          <img src={femaleClothingImage} alt="Trendy women's clothing" />
          <div className={styles.categoryText}>
            <h2>Chic & Confident: Women&apos;s Fashion That Works</h2>
            <p>
              Shop the latest styles in women&apos;s fashion. From casual
              outfits to elegant dresses, our collection will keep you on trend
              and feeling fabulous.
            </p>
          </div>
          <img src={jewelryImage} alt='A gold bracelet' />
          <div className={styles.categoryText}>
            <h2>Add a Touch of Glamour</h2>
            <p>
              From statement rings to delicate bracelets, our jewelry collection
              offers pieces that shine for every occasion. Find the perfect
              accessory to elevate your style.
            </p>
          </div>
          <img src={electronicsImage} alt='A collection of electronics' />
          <div className={styles.categoryText}>
            <h2>Tech That Powers Your Life</h2>
            <p>
              Explore our wide range of electronics - monitors, gadgets, and
              accessories - that bring the future to your fingertips. Shop the
              latest innovations at affordable prices.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
