/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (url, method, payload) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setData(null);
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios({ method, url, payload });
      // console.log(response.data);
      setData(response.data);
    } catch (e) {
      if (e.response) { // received some failed status code
        console.error('Received an invalid status code.', {
          data: e.response.data,
          status: e.response.status,
          headers: e.response.headers,
        });
        setError(e.response.data);
      } else if (e.request) { // there was no response
        console.error('Received no response.', e.request);
        setError('Received no response from the API.');
      } else {
        console.error(`Error: ${e.message}`);
        setError(e);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => { fetchData(); }, [url]);

  return {
    data, isLoading, error, fetchData,
  };
};

export default useAxios;
