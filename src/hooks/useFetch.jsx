import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export const useFetch = (url, method, headers) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const requestFetch = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(url, {
          method: method || "GET",
          headers: headers,
        });
        const data = await response.json();
        setLoading(false);
        setResult(data);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };
    requestFetch();
  }, []);

  console.log(result);

  return {
    loading,
    error,
    result,
  };
};
