import React, { useState } from "react";

import { api } from "../../services/api";

export const useRequestUpdate = ({ path, id, callbackSuccess }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const execute = (payload, params = {}, recordId) => {
    setLoading(true);

    api
      .request()
      .put(`${path}/${id || recordId}`, payload, {
        params,
      })
      .then(({ data }) => {
        if (callbackSuccess) callbackSuccess();

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
