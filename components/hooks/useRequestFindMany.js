import React, { useState } from 'react';

import { api } from '../../services/api';

export const useRequestFindMany = ({ path, defaultQuery = {} }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState();

  const findMany = (params = {}) => {
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
      .catch(() => {
        setResponse(null);

        setError(true);
        setLoading(false);
      });
  };

  return {
    execute: findMany,
    response,
    error,
    loading,
  };
};
