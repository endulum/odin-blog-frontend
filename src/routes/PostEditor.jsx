import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import useAxios from '../hooks/useAxios';
import APIForm from '../components/APIForm';

export default function PostEditor({ token }) {
  const { id } = useParams();
  const [success, setSuccess] = useState(false);

  // get author data from the token.
  // we need this to check if this post belongs to the current user.
  const { data, isLoading, responseError } = useAxios(
    `http://localhost:3000/api/author/${token.userName}`,
    'GET',
  );

  if (isLoading) return (<p>Loading...</p>);

  if (responseError) {
    return (
      <div className="api-error">
        <b>API Error:</b>
        {' '}
        {responseError}
      </div>
    );
  }

  if (data && !data.posts.find((post) => post.title === id)) { return (<Navigate to={`/post/${id}`} />); }

  return success ? (<Navigate to={`/post/${success}`} />) : (
    <APIForm
      url={`http://localhost:3000/api/post/${id}`}
      method="PUT"
      onSuccess={(form, submissionData) => {
        setSuccess(form.title);
      }}
      token={token}
    >
      {[
        { id: 'title', label: 'Title: ', type: ['input', 'text'] },
        { id: 'subtitle', label: 'Subtitle: ', type: ['input', 'text'] },
        { id: 'content', label: 'Content:', type: ['textarea'] },
      ].map((input) => (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label key={input.id}>
          <span>{input.label}</span>
          { input.type[0] === 'input' && <input type={input.type[1]} id={input.id} /> }
          { input.type[0] === 'textarea' && <textarea id={input.id} /> }
        </label>
      ))}
      <button type="submit">Submit</button>
    </APIForm>
  );
}
