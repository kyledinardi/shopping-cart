import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backendFetch from '../helpers/backendFetch';
import styles from '../style/Login.module.css';

function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  async function submitLogin(e) {
    e.preventDefault();
    const prefix = e.target.id === 'guestLogin' ? 'guest-' : '';

    const response = await backendFetch('/users/login', {
      method: 'POST',
      hasBearer: false,

      body: {
        username: document.getElementById(`${prefix}username`).value,
        password: document.getElementById(`${prefix}password`).value,
      },
    });

    if (response.error) {
      e.target.reset();
      setErrorMessage(response.error.message);
      return;
    }

    localStorage.setItem('token', response.token);
    localStorage.setItem('userId', response.user._id);
    navigate('/');
  }

  return (
    <div className={styles.wrapper}>
      <main className={styles.login}>
        <h1>Log in to Shomamajig</h1>
        {errorMessage !== '' && (
          <div className={styles.error}>{errorMessage}</div>
        )}
        <form className={styles.loginForm} onSubmit={(e) => submitLogin(e)}>
          <div className={styles.fields}>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              name='username'
              id='username'
              maxLength={50}
              required
            />
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              maxLength={50}
              required
            />
          </div>
          <button className={styles.loginButton}>Log In</button>
        </form>
        <form id='guestLogin' onSubmit={(e) => submitLogin(e)}>
          <input
            type='hidden'
            id='guest-username'
            name='username'
            value='Guest'
          />
          <input type='hidden' id='guest-password' name='password' value='1' />
          <button className={styles.guestButton}>Log in as guest</button>
        </form>
        <p>
          Don&apos;t have an account?{' '}
          <Link className={styles.signUpLink} to='/sign-up'>
            Sign up
          </Link>
        </p>
      </main>
    </div>
  );
}

export default Login;
