import { Link, useParams } from 'react-router-dom';
import useAxios from '../hooks/useAxios';

export default function Post() {
  const {
    data, isLoading, responseError, fetchData,
  } = useAxios(
    `http://localhost:3000/api/post/${useParams().id}`,
    'GET',
  );
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {responseError && (
      <p>
        <b>API error:</b>
        {' '}
        {responseError}
      </p>
      )}
      {data && (
      <>
        <h2>{data.title}</h2>
        <h3>{data.subtitle}</h3>
        <p>
          By
          {' '}
          <Link to={`/author/${data.author.userName}`} className="nav-link">{data.author.displayName}</Link>
          {' '}
          on
          {' '}
          {data.datePosted}
        </p>
        <div>
          {data.content}
        </div>
        {data.lastEdited && <p>{data.lastEdited}</p>}
        <h2>Comments</h2>
        {data.comments.length < 1 ? (
          <p><i>This post doesn't have any comments yet.</i></p>
        ) : (
          <>
            {data.comments.map((comment) => (
              <div className="boxed" key={comment.id}>
                <h3>{comment.commentBy}</h3>
                <p>{comment.commentText}</p>
                <small>
                  Posted on
                  {' '}
                  {comment.datePosted}
                </small>
              </div>
            ))}
          </>
        )}
      </>
      ) }
    </>
  );
}

// todo: format dates nicely
