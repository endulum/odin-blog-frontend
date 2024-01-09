import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import useLocalStorage from './custom-hooks/useLocalStorage';
import JSONForm from './components/JSONForm';

import Layout from './components/Layout';
import Login from './routes/Login';
import Main from './routes/Main';
import NoMatch from './routes/NoMatch';

import './styles/style.css';

export default function App() {
  const [token, setToken] = useLocalStorage('token', null);

  function handleLogOut() { setToken(null); }

  return (
    <Routes>
      <Route element={<Layout token={token} onLogOut={handleLogOut} />}>
        <Route path="/" element={<Main token={token} />} />
        <Route
          path="/login"
          element={
          token
            ? <Navigate to="/" />
            : <Login setToken={setToken} />
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
