import React, { useState } from "react";

import { api } from "../../services/api";

export const useRequestCreate = ({ path }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const execute = (payload, params = {}) => {
    setLoading(true);

    api
      .request()
      .post(path, payload, {
        params,
      })
      .then(() => {
        setResponse(true);

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
