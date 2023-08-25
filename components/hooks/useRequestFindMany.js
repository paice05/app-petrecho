import { useState } from 'react';

import { api } from '../../services/api';
import { useLogout } from './useLogout';

export const useRequestFindMany = ({ path, defaultQuery = {} }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState();

  const { redirectLogin } = useLogout();

  const execute = (params = {}) => {
    setLoading(true);

    api
      .request()
      .get(path, {
        params: {
          ...defaultQuery,
          ...params,
        },
      })
      .then(({ data }) => {
        setResponse(data);

        setError(false);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 401) redirectLogin();

        setResponse(null);

        setError(true);
        setLoading(false);
      });
  };

  return {
    execute,
    response,
    error,
    loading,
  };
};
