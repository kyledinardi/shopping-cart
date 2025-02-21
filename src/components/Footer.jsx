import gitHubLogo from '../assets/github-mark.svg';
import styles from '../style/Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href='https://kyledinardi.github.io/homepage/'
        target='_blank'
        rel='noopener noreferrer'
      >
        <span>© 2023 Kyle Dinardi</span>
      </a>
      <a
        href='https://github.com/kyledinardi/shopping-cart'
        target='_blank'
        rel='noopener noreferrer'
        className={styles.logoLink}
      >
        <img className={styles.logo} src={gitHubLogo} alt='GitHub logo' />
      </a>
    </footer>
  );
}

export default Footer;
