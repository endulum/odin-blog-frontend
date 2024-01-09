import { useEffect, useState } from 'react';

import axios from 'axios';
import useLocalStorage from './custom-hooks/useLocalStorage';
import JSONForm from './components/JSONForm';
import './styles/style.css';

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
          <JSONForm
            onSuccess={setToken}
            method="POST"
            endpoint="login"
          >
            <label htmlFor="userName">
              <span>User Name:</span>
              <input type="text" id="userName" />
            </label>

            <label htmlFor="password">
              <span>Password:</span>
              <input type="password" id="password" />
            </label>
          </JSONForm>
        </div>
      )}
    </div>
  );
}
