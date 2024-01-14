import { useParams, Link } from 'react-router-dom';
import useAxios from '../hooks/useAxios';

export default function Author({ token }) {
  const { id } = useParams();
  const {
    data, isLoading, responseError, fetchData,
  } = useAxios(
    `http://localhost:3000/api/author/${id}`,
    'GET',
  );
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {responseError && (
      <p className="api-error">
        <b>API error:</b>
        {' '}
        {responseError}
      </p>
      )}
      {data && (
        <>
          <h2>{data.displayName}</h2>
          <h3>
            @
            {data.userName}
          </h3>
          {token.userName === id && (
            <Link to={`/author/${id}/edit`} className="nav-link">
              Edit your info
            </Link>
          )}
          <p>
            Joined on
            {' '}
            {data.dateJoined}
          </p>
          <p>{data.bio}</p>
          <h2>Posts</h2>
          <p>
            <Link className="nav-link" to="/post/new">New Post</Link>
          </p>
          {data.posts.length < 1 ? <p><i>This author has not made any posts yet.</i></p> : (
            <>
              {data.posts.map((post) => (
                <div className="boxed" key={post.id}>
                  <h3>
                    <Link to={`/post/${post.title}`} className="nav-link">
                      {post.title}
                    </Link>
                  </h3>
                  <h4>{post.subtitle}</h4>
                  {token.userName === id && (
                  <p>
                    <Link className="nav-link" to={`/post/${post.title}/edit`}>
                      Edit this post
                    </Link>
                  </p>
                  )}
                  <p>
                    Posted on
                    {' '}
                    {post.datePosted}
                  </p>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
}
