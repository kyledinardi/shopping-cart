import { Link } from 'react-router-dom';
import styles from '../style/ErrorPage.module.css';

export default function ErrorPage() {
  return (
    <main className={styles.error}>
      <h1>This page does not exist!</h1>
      <Link to='/'>Click here to go back to the homepage</Link>
    </main>
  );
}
