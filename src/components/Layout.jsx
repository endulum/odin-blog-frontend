import { Link, Outlet } from 'react-router-dom';
import useAxios from '../custom-hooks/useAxios';

export default function Layout({ token, onLogOut }) {
  const { data, isLoading, error } = useAxios(
    'http://localhost:3000/api/authors',
    'GET',
  );

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
        <footer>
          {isLoading && <p>Loading...</p>}
          {data && (
            <>
              <b>All blog authors: </b>
              {data.map((author, index) => {
                if (index === data.length - 1) {
                  return (
                    <Link className="nav-link" key={author.userName} to={`/author/${author.userName}`}>
                      {author.displayName}
                    </Link>
                  );
                } return (
                  <span key={author.userName}>
                    <Link className="nav-link" to={`/author/${author.userName}`}>
                      {author.displayName}
                    </Link>
                    ,
                    {' '}
                  </span>
                );
              })}
            </>
          )}
          {error && <p><i>{error}</i></p>}
        </footer>
      </main>
    </>
  );
}
