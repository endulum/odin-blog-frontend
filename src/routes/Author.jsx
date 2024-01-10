import { Link, useParams } from 'react-router-dom';
import useAxios from '../custom-hooks/useAxios';

export default function Author() {
  const {
    data, isLoading, error, fetchData,
  } = useAxios(
    `http://localhost:3000/api/author/${useParams().id}`,
    'GET',
  );

  console.log('hi');

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {data && (
      <>
        <h1>{data.displayName}</h1>
        <h2>
          @
          {data.userName}
        </h2>
        <p>{data.bio}</p>
        <h2>Posts</h2>
        {data.posts.length > 0 ? (
          <ul>
            {data.posts.map((post) => (
              <li key={post.id}>
                <b>
                  {post.title}
                  :
                  {' '}
                </b>
                {post.subtitle}
              </li>
            ))}
          </ul>
        ) : <p><i>This author hasn't written any posts yet.</i></p>}
      </>
      )}
      {error && <p><i>{error}</i></p>}
    </>
  );
}

// problem: if i navigate right between author urls, nothing changes.
// i have to either refresh, or go to '/' and then go the next author url. why?
