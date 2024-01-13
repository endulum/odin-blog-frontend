import { Link } from 'react-router-dom';

import useAxios from '../hooks/useAxios';

export default function Index() {
  const {
    data, isLoading, responseError, fetchData,
  } = useAxios(
    'http://localhost:3000/api/posts',
    'GET',
  );

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {responseError && (
      <p className="api-error">
        <b>API Error:</b>
        {' '}
        {responseError}
      </p>
      )}
      {data && (
      <>
        <h2>Post Overview</h2>
        {data.map((post) => (
          <div key={post.id} className="boxed">
            <h3>
              <Link to={`/post/${post.title}`} className="nav-link">
                {post.title}
              </Link>
            </h3>
            <h4>{post.subtitle}</h4>
            <p>
              By
              {' '}
              <b>
                <Link to={`/author/${post.author.userName}`} className="nav-link">
                  {post.author.displayName}
                </Link>
              </b>
              {' '}
              on
              {' '}
              {post.datePosted}
            </p>
          </div>
        ))}
      </>
      )}
    </>
  );
}

// todo: sort posts from newest to oldest
// nice-to-have: pagination
