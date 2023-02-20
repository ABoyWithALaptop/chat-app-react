import { useEffect, useState } from "react";
import { getAuthUser } from "../api";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchUserFriendList, updateUser } from "../../store/userSlice";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const controller = new AbortController();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    getAuthUser() // * get status of user
      .then(({ data }) => {
        dispatch(updateUser(data));
        dispatch(fetchUserFriendList());
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => setLoading(false), 1000);
      });
    return () => {
      controller.abort();
    };
  }, []);
  return { user, loading };
}
