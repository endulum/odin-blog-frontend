import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <header>
        <h1>
          <Link to="/" className="nav-link">Blog</Link>
        </h1>
        <nav>
          <Link to="/login" className="nav-link">Log In</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
