import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import APIForm from '../components/APIForm';

export default function AuthorEditor({ token, setToken }) {
  const { id } = useParams();
  const [success, setSuccess] = useState(false);
  if (id === token.userName) {
    return (
      <APIForm
        url={`http://localhost:3000/api/author/${id}`}
        method="PUT"
        onSuccess={(form, data) => {
          // console.log(form, data);
          setToken({
            ...token,
            userName: form.userName,
            displayName: form.displayName,
          });
          setSuccess(true);
        }}
        token={token}
      >
        {[
          { id: 'userName', label: 'Username: ', type: ['input', 'text'] },
          { id: 'displayName', label: 'Display Name: ', type: ['input', 'text'] },
          { id: 'bio', label: 'Bio:', type: ['textarea'] },
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
  } if (success) return (<Navigate to={`/author/${token.userName}`} />);
  return (<Navigate to={`/author/${id}`} />);
}
