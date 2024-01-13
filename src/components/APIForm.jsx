import { useState, useEffect } from 'react';
import axios from 'axios';

export default function APIForm({
  url,
  method,
  onSuccess,
  token,
  children,
}) {
  // holds form data
  const [form, setForm] = useState({});
  // if anything changes in the form, update the form state
  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  // flag: are we waiting for api response?
  const [loading, setLoading] = useState(false);

  // flag: did we successfully submit the form?
  const [success, setSuccess] = useState(false);

  // string for response error messages
  const [responseError, setResponseError] = useState('');

  function handleResponseError(e) {
    if (e.response) {
      console.error('Received an invalid status code.', {
        data: e.response.data,
        status: e.response.status,
        headers: e.response.headers,
      });
      if (e.response.data.charAt(0) === '<') {
        setResponseError(`${e.response.status} Not an existing endpoint.`);
      } else setResponseError(`${e.response.status} ${e.response.data}`);
    } else if (e.request) {
      console.error('Received no response.', e.request);
      setResponseError('Received no response.');
    } else {
      console.error(`Error: ${e.message}`);
      setResponseError('Something went wrong.');
    }
  }

  // array of strings for input error messages
  const [inputErrors, setInputErrors] = useState([]);

  useEffect(() => {
    // console.log(inputErrors);
    document.querySelectorAll('input, textarea').forEach((input) => {
      input.classList.remove('error');
    });
    if (inputErrors.length > 0) {
      inputErrors.forEach((error) => {
        if (error.path !== null) { document.getElementById(error.path)?.classList.add('error'); }
      });
    }
  }, [inputErrors]);

  async function getResponse(isGettingExistingData) {
    setLoading(true);
    try {
      const response = await axios({
        url,
        method: isGettingExistingData ? 'GET' : method,
        data: isGettingExistingData ? null : form,
        headers: isGettingExistingData ? null : {
          Authorization: `Bearer ${token.tokenHash}`,
        },
      });
      if (isGettingExistingData) {
        const formPreset = {};
        setTimeout(() => {
          Object.keys(response.data).forEach((field) => {
            const input = document.getElementById(field);
            if (input) {
              formPreset[field] = response.data[field];
              input.value = response.data[field];
            }
          });
        }, 10); // small delay to allow necessary dom elements to load
        setForm(formPreset);
      } else if (response.data.errors) setInputErrors(response.data.errors);
      else {
        setSuccess(true);
        onSuccess(form, response.data);
      }
    } catch (e) {
      handleResponseError(e);
    }
    setLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getResponse(false);
  }

  // when the component mounts, if the method is 'PUT',
  //  fill the form with preexisting data.
  useEffect(() => {
    if (method === 'PUT') {
      getResponse(true);
    }
  }, []);

  // form should be persistent no matter the loading or error status,
  // so that values in the form don't disappear on rerender.
  return success ? (<div>Success</div>) : (
    <>
      {responseError ? (
        <div className="api-error">
          <b>API error:</b>
          {' '}
          {responseError}
        </div>
      ) : (
        <>
          <form onChange={handleChange} onSubmit={handleSubmit}>
            {children}
          </form>

          {inputErrors.length > 0 && (
          <div>
            <p>Errors:</p>
            <ul>
              {inputErrors.map((error) => (
                <li key={error.path}>
                  {error.msg}
                </li>
              ))}
            </ul>
          </div>
          )}
        </>
      )}
      {loading && <div>Loading...</div>}
    </>
  );
}
