import { useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  const input = {
    type,
    value,
    onChange,
  };

  return {
    reset,
    input,
  };
};

export const useRequiredField = (type, name) => {
  const { input, reset } = useField(type);
  const [error, setError] = useState("");

  const validate = () => {
    if (!input.value) {
      setError(`${name} is required`);
      return false;
    }
    setError("");
    return true;
  };

  return {
    validate,
    reset,
    error,
    input,
  };
};
