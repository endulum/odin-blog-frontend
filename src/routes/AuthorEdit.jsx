import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import useAxios from '../custom-hooks/useAxios';
import JSONForm from '../components/JSONForm';

export default function AuthorEdit({ token }) {
  const [success, setSuccess] = useState(false);

  const {
    data, isLoading, error,
  } = useAxios(
    `http://localhost:3000/api/author/${useParams().id}`,
    'GET',
  );

  if (success) return (<Navigate to={`/author/${token.userName}`} />);

  return token.userName === useParams().id ? (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
      <JSONForm
        onSuccess={() => setSuccess(true)}
        method="PUT"
        endpoint={`author/${token.userName}`}
        token={token}
      >
        <label htmlFor="userName">
          <span>User name: </span>
          <input type="text" id="userName" defaultValue={data.userName} />
        </label>
        <label htmlFor="displayName">
          <span>Display name: </span>
          <input type="text" id="displayName" defaultValue={data.displayName} />
        </label>
        <label htmlFor="bio">
          <span>Bio: </span>
          <textarea id="bio" defaultValue={data.bio} />
        </label>
        <button type="submit">Save Changes</button>
      </JSONForm>
      )}
    </>
  ) : (
    <Navigate to="/" />
  );
}
