import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import Root from "@/views/Root";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const location = useLocation();
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, [auth?.accessToken, refresh]);

  return (
    <>
      {!isLoading ? (
        auth?.accessToken ? (
          <Root />
        ) : (
          <Navigate to="/login" state={{ from: location }} replace />
        )
      ) : null}
    </>
  );
};

export default ProtectedRoutes;
