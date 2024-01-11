import { redirect } from 'react-router-dom';
import JSONForm from '../components/JSONForm';

export default function Login({ setToken }) {
  function handleSuccess(data) {
    console.log(data);
    setToken(data);
    redirect('/');
  }
  return (
    <JSONForm
      onSuccess={handleSuccess}
      method="POST"
      endpoint="login"
    >
      <label htmlFor="userName">
        <span>Username:</span>
        <input type="text" id="userName" />
      </label>
      <label htmlFor="password">
        <span>Password:</span>
        <input type="password" id="password" />
      </label>
      <button type="submit">Log In</button>
    </JSONForm>
  );
}
