import { useContext, useEffect, useState } from "react";
import { getAuthUser } from "../api";
import { User } from "../types/types";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const { user, updateAuthUser } = useContext(AuthContext);
  const controller = new AbortController();

  useEffect(() => {
    getAuthUser()
      .then(({ data }) => {
        updateAuthUser(data);
        setTimeout(() => setLoading(false), 5000);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => setLoading(false), 5000);
      });
    return () => {
      controller.abort();
    };
  }, []);
  return { user, loading };
}
