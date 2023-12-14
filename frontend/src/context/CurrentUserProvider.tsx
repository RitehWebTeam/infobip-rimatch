import { User, UsersService } from "@/api/users";
import { createContext } from "react";

export const CurrentUserContext = createContext<User | null>(null);

const CurrentUserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const currentUserQuery = UsersService.useGetCurrentUser();
  if (currentUserQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (currentUserQuery.isError) {
    return <pre>{JSON.stringify(currentUserQuery.error)}</pre>;
  }

  return (
    <CurrentUserContext.Provider value={currentUserQuery.data ?? null}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContextProvider;
