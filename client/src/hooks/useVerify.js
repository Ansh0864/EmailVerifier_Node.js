import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyEmail } from "../utils/api";

export function useVerify() {
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);
  const navigate             = useNavigate();

  const verify = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const data = await verifyEmail(email);
      navigate("/result", { state: { data } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { verify, loading, error };
}