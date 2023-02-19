import React from "react";
import useSWR from "swr";

const UseMemory = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/api/memories",
    fetcher,
    { refreshInterval: 1000 }
  );
  return {
    data,
    isLoading,
    error,
  };
};

export default UseMemory;
