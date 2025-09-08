import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearUser, fetchCurrentUser } from "@/store/slices/user.slice";

const useCurrentUser = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const loadUser = async () => {
      if (!isAuthenticated) {
        dispatch(clearUser());
        return;
      }

      const token = await getAccessTokenSilently();
      dispatch(fetchCurrentUser(token));
    };

    loadUser();
  }, [isAuthenticated, getAccessTokenSilently, dispatch]);

  return user;
};

export default useCurrentUser;
