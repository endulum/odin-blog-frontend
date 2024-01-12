import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Index from './routes/Index';
import NoMatch from './routes/NoMatch';

import './styles/style.css';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Index />} />
        <Route path="/post/:id" />
        <Route path="/author/:id" />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
