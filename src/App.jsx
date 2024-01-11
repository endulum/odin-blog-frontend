import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import useLocalStorage from './custom-hooks/useLocalStorage';
import JSONForm from './components/JSONForm';

import Layout from './components/Layout';
import Login from './routes/Login';
import Main from './routes/Main';
import Author from './routes/Author';
import AuthorEdit from './routes/AuthorEdit';
import NoMatch from './routes/NoMatch';

import './styles/style.css';

export default function App() {
  const [token, setToken] = useLocalStorage('token', null);
  // todo: this token needs to be adjusted if the author changes their username

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
        <Route
          path="/author/:id"
          element={<Author token={token} />}
        />
        <Route
          path="/author/:id/edit"
          element={
            token
              ? <AuthorEdit token={token} />
              : <Navigate to="/" />
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
