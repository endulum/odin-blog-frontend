export default function Main({ token }) {
  return (
    <>
      {token
        ? (
          <p>
            You&apos;re logged in as
            {' '}
            <b>
              {token.userName}
              .
            </b>
          </p>
        )
        : <p>You're not logged in.</p>}
    </>
  );
}
