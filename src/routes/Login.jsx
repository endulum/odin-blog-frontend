import { Navigate } from 'react-router-dom';

import APIForm from '../components/APIForm';

export default function Login({ token, onSuccess }) {
  return token ? (<Navigate to="/" />) : (
    <>
      <h2>Log In</h2>
      <APIForm
        url="http://localhost:3000/api/login"
        method="POST"
        onSuccess={(data) => onSuccess(data)}
      >
        {[
          { id: 'userName', label: 'Username: ', type: ['input', 'text'] },
          { id: 'password', label: 'Password: ', type: ['input', 'password'] },
        ].map((input) => (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label key={input.id}>
            <span>{input.label}</span>
            { input.type[0] === 'input' && <input type={input.type[1]} id={input.id} /> }
            { input.type[0] === 'textarea' && <textarea id={input.id} /> }
          </label>
        ))}
        <button type="submit">Log In</button>
      </APIForm>
    </>
  );
}
