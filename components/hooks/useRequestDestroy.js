import React, { useState } from 'react';

import { api } from '../../services/api';

export const useRequestDestroy = ({ path, callbackSuccess }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState();

  const execute = (id) => {
    api
      .request()
      .delete(`${path}/${id}`)
      .then(() => {
        if (callbackSuccess) callbackSuccess();
        setResponse(true);

        setError(false);
        setLoading(false);
      })
      .catch((error) => {
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
