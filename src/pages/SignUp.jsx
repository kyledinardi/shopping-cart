import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backendFetch from '../helpers/backendFetch';
import styles from '../style/Login.module.css';

function Login() {
  const [errorArray, setErrorArray] = useState(null);
  const navigate = useNavigate();

  async function submitLogin(e) {
    e.preventDefault();

    const response = await backendFetch('/users', {
      method: 'POST',
      hasBearer: false,

      body: JSON.stringify({
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        passwordConfirm: document.getElementById('passwordConfirm').value,
      }),
    });

    if (response.errors) {
      e.target.reset();
      setErrorArray(response.errors);
      return;
    }

    navigate('/login');
  }

  return (
    <div className={styles.wrapper}>
      <main className={styles.login}>
        <h1>Sign up for Shomamajig</h1>
        {errorArray && (
          <ul>
            {errorArray.map((error, i) => (
              <li key={i}>{error.msg}</li>
            ))}
          </ul>
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
            <label htmlFor='passwordConfirm'>Confirm Password</label>
            <input
              type='password'
              name='passwordConfirm'
              id='passwordConfirm'
              maxLength={50}
              required
            />
          </div>
          <button className={styles.loginButton}>Sign Up</button>
        </form>
        <p>
          Already have an account?{' '}
          <Link className={styles.signUpLink} to='/login'>
            Log in
          </Link>
        </p>
      </main>
    </div>
  );
}

export default Login;
