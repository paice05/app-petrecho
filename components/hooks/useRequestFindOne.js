import React, { useState } from 'react';

import { api } from '../../services/api';

export const useRequestFindOne = ({ path, id, defaultQuery = {} }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState();

  const execute = (params = {}) => {
    setLoading(true);

    api
      .request()
      .get(`${path}/${id}`, {
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
      .catch(() => {
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
