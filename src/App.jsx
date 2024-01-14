import { useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';

import useLocalStorage from './hooks/useLocalStorage';

import Layout from './components/Layout';
import Index from './routes/Index';
import Login from './routes/Login';
import Post from './routes/Post';
import PostEditor from './routes/PostEditor';
import PostNew from './routes/PostNew';
import Author from './routes/Author';
import AuthorEditor from './routes/AuthorEditor';
import NoMatch from './routes/NoMatch';

import './styles/style.css';

export default function App() {
  const [token, setToken] = useLocalStorage('token', null);

  // useEffect(() => {
  //   console.log(token);
  // }, [token]);

  return (
    <Routes>
      <Route element={<Layout token={token} onLogOut={setToken} />}>
        <Route path="/" element={<Index />} />
        <Route path="login" element={<Login token={token} onSuccess={setToken} />} />
        <Route path="/post/:id" element={<Post token={token} />} />
        <Route path="/post/:id/edit" element={<PostEditor token={token} />} />
        <Route path="/post/new" element={<PostNew token={token} />} />
        <Route path="/author/:id" element={<Author token={token} />} />
        <Route path="/author/:id/edit" element={<AuthorEditor token={token} setToken={setToken} />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
