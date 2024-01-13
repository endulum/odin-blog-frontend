import { Navigate, useParams } from 'react-router-dom';

export default function AuthorEditor({ token }) {
  const { id } = useParams();
  return id === token.userName ? (
    <p>pretend you're editing your profile</p>
  ) : (<Navigate to="/" />);
}
