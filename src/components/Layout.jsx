import { Link, Outlet } from 'react-router-dom';

export default function Layout({ token, onLogOut }) {
  return (
    <>
      <header>
        <h1>
          <Link to="/" className="nav-link">Blog</Link>
        </h1>
        <nav>
          {!token && <Link to="/login" className="nav-link">Log In</Link>}
          {token && (
            <>
              <span>
                Logged in as
                {' '}
                <Link to={`/author/${token.userName}`} className="nav-link">{token.userName}</Link>
              </span>
              <Link to="/" onClick={onLogOut} className="nav-link">Log Out</Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
