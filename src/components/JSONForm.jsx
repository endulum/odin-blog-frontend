import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function JSONForm({
  onSuccess,
  method,
  endpoint,
  children,
}) {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState([]);
  const [waiting, setWaiting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setWaiting(true);
    try {
      const response = await axios({
        method,
        url: `http://localhost:3000/api/${endpoint}`,
        data: form,
      });
      if (response.data.errors) setErrors(response.data.errors);
      else onSuccess(response.data);
    } catch (err) {
      console.error(err);
    }
    setWaiting(false);
  }

  useEffect(() => {
    document.querySelectorAll('input').forEach((input) => {
      input.classList.remove('error');
    });
    if (errors.length > 0) {
      errors.forEach((error) => {
        if (error.path !== null) { document.getElementById(error.path).classList.add('error'); }
      });
    }
  }, [errors]);

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      {errors.length > 0 && (
        <div>
          <p>Errors with your submission:</p>
          <ul>
            {errors.map((error) => <li key={error.path}>{error.msg}</li>)}
          </ul>
        </div>
      )}
      {waiting && <p>Waiting...</p>}
      {children}
      <button type="submit">Log In</button>
    </form>
  );
}

JSONForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  method: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default JSONForm;
