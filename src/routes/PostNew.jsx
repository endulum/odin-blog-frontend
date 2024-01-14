import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import APIForm from '../components/APIForm';

export default function PostNew({ token }) {
  const [success, setSuccess] = useState(false);
  if (!token) return (<Navigate to="/" />);
  return success ? (<Navigate to={`/post/${success}`} />) : (
    <APIForm
      url="http://localhost:3000/api/posts"
      method="POST"
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
