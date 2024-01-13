import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Index from './routes/Index';
import Post from './routes/Post';
import Author from './routes/Author';
import NoMatch from './routes/NoMatch';

import './styles/style.css';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Index />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/author/:id" element={<Author />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
