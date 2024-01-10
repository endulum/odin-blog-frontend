import { Link } from 'react-router-dom';

export default function NoMatch() {
  return (
    <p>
      No route found for this URL.
      {' '}
      <Link to="/" className="nav-link">Go back home</Link>
    </p>
  );
}
