/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (url, method, payload) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [responseError, setResponseError] = useState(null);

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

  const fetchData = async () => {
    setData(null);
    setIsLoading(true);
    setResponseError(null);
    try {
      const response = await axios({ method, url, payload });
      // console.log(response.data);
      setData(response.data);
    } catch (e) {
      handleResponseError(e);
    }
    setIsLoading(false);
  };

  useEffect(() => { fetchData(); }, [url]);

  return {
    data, isLoading, responseError, fetchData,
  };
};

export default useAxios;
