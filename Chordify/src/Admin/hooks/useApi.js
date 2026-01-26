import { useState } from "react";
import API from "../api";

export default function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const callApi = async (method, url, data = null) => {

    setLoading(true);
    setError("");

    try {
      const response = await API({
        method,
        url,
        data,
      });

      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Something went wrong";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    callApi,
  };
}
