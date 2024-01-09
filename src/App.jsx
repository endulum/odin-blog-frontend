import { useState } from 'react';

import axios from 'axios';
import useLocalStorage from './custom-hooks/useLocalStorage';
// import './styles/main.css';

export default function App() {
  const [token, setToken] = useLocalStorage('token', null);

  return (
    <div>
      <h1>Bloggo</h1>
      { token ? (
        <div>
          <p>
            You&apos;re logged in as
            {' '}
            <b>{token.displayName}</b>
            .
            <button type="button" onClick={() => setToken(null)}>
              Log Out
            </button>
          </p>
        </div>
      ) : (
        <div>
          <p>You&apos;re not logged in.</p>
          <LoginForm onSuccess={setToken} />
        </div>
      )}
    </div>
  );
}

function LoginForm({ onSuccess }) {
  const [form, setForm] = useState({
    userName: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(form);
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:3000/api/login',
        data: form,
      });
      console.log(response.data);
      if (response.data.accessToken) onSuccess(response.data);
      else setErrors(response.data.errors.map((error) => error.msg));
    } catch (err) {
      console.error(err);
      setErrors([err.message]);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <div>
          <p>Errors with your submission:</p>
          <ul>
            {errors.map((error, index) => <li key={index}>{error}</li>)}
          </ul>
        </div>
      )}
      <label htmlFor="userName">User Name:</label>
      <input type="text" id="userName" onChange={handleChange} />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" onChange={handleChange} />

      <button type="submit">Log In</button>
    </form>
  );
}
