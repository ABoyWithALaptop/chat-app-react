import { useEffect, useState } from "react";
import { getAuthUser } from "../api";
import { User } from "../types/types";

export function useAuth() {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const controller = new AbortController();

  useEffect(() => {
    console.log("haha");
    getAuthUser()
      .then(({ data }) => {
        setUser(data);
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
  console.log("hoho");
  return { user, loading };
}
