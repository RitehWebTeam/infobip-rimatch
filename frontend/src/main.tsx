import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.tsx";
import MatchCard from "./components/MatchCard.tsx";
import ErrorPage from "./ErrorPage.tsx";
import LoginForm from "./views/LoginForm.tsx";
import RegisterForm from "./views/RegisterForm.tsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Root from "./views/Root.tsx";
import MatchesPage from "./views/Matches/MatchesPage.tsx";
import UserPageLayout from "./views/UserPageLayout.tsx";
import UserProfilePage from "./views/UserProfileForm.tsx";
import UserPreferenceForm from "./views/UserPreferenceForm.tsx";
import ChatPage from "./views/ChatPage.tsx";
import React from "react";
import SetupPreferencesPage from "./views/SetupPreferences/SetupPreferencesPage.tsx";
import ListOfMatchesForChatPage from "./views/ListOfMatchesForChatPage.tsx";
import ProfileDetailed from "./views/Matches/ProfileDetailed.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes layout={<Root />} />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MatchCard /> },
      {
        path: "matches",
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <MatchesPage /> },
          {
            path: "profile",
            element: <ProfileDetailed />,
          },
        ],
      },
      {
        path: "user",
        element: <UserPageLayout />,
        errorElement: <ErrorPage />,
        children: [
          { path: "profile", element: <UserProfilePage /> },
          { path: "preferences", element: <UserPreferenceForm /> },
        ],
      },
      {
        path: "chat",
        element: <ChatPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "listOfMatches",
        element: <ListOfMatchesForChatPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/init/preferences",
    element: <SetupPreferencesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
    errorElement: <ErrorPage />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  </React.StrictMode>
);
