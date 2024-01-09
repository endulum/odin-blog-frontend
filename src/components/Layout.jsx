import { Link, Outlet } from 'react-router-dom';

export default function Layout({ token, onLogOut }) {
  return (
    <>
      <header>
        <h1>Blog</h1>
        <nav>
          {!token && <Link to="/login" className="nav-link">Log In</Link>}
          {token && (
            <Link to="/" onClick={onLogOut} className="nav-link">Log Out</Link>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
