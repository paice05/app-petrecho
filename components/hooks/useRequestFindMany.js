import React, { useState } from 'react';

import { api } from '../../services/api';

export const useRequestFindMany = ({ path, defaultQuery = {} }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState();

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
