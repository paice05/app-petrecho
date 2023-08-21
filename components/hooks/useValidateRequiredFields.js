import React from 'react';

export const useValidateRequiredFields = ({ fields = [] }) => {
  const validate = (values) => {
    const validate = fields.filter((item) => {
      if (Array.isArray(values[item])) return values[item].length === 0;

      if (typeof values[item] === 'object') return Object.values(values[item]).length === 0;

      return !values[item];
    });

    if (validate.length) {
      return {
        errors: true,
        fields: validate,
      };
    }

    return {
      errors: false,
      fields: [],
    };
  };

  return {
    validate,
  };
};
