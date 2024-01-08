import axios from 'axios';
import useLocalStorage from './custom-hooks/useLocalStorage';
import './styles/main.css';

export default function App() {
  const [token, setToken] = useLocalStorage('token', null);

  // async function logIn(userName, password) {
  //   try {
  //     const response = await axios({
  //       method: 'POST',
  //       url: 'http://localhost:3000/api/login',
  //       data: { userName, password },
  //     });
  //     // console.log(response.data);
  //     if (response.data.accessToken) setToken(response.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  return (
    <div>
      <h1>Bloggo</h1>
      { token ? (
        <div>
          <p>
            You&apos;re logged in as
            {' '}
            <b>{token.displayName}</b>
            .
          </p>
        </div>
      ) : (
        <div>
          <p>You&apos;re not logged in.</p>
        </div>
      )}
    </div>
  );
}
