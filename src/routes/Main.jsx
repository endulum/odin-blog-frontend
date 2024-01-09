export default function Main({ token }) {
  return (
    <>
      {token
        ? (
          <p>
            You're logged in as
            {' '}
            <b>{token.displayName}</b>
          </p>
        )
        : <p>You're not logged in.</p>}
    </>
  );
}
