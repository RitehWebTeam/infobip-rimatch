import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.tsx";
import ErrorPage from "./ErrorPage.tsx";
import LoginForm from "./views/LoginForm.tsx";
import RegisterForm from "./views/RegisterForm.tsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Root from "./views/Root.tsx";
import MatchesPage from "./views/Matches/MatchesPage.tsx";
import ChatPage from "./views/ChatPage.tsx";
import React from "react";
import SetupPreferencesPage from "./views/SetupPreferences/SetupPreferencesPage.tsx";
import ListOfMatchesForChatPage from "./views/ListOfMatchesForChatPage.tsx";
import ProfileDetailed from "./views/Matches/ProfileDetailed.tsx";
import SettingsList from "./views/settings/SettingsList.tsx";
import SettingsPreferences from "./views/settings/SettingsPreferences.tsx";
import SettingsLayout from "./views/settings/SettingsLayout.tsx";
import SettingsProfile from "./views/settings/SettingsProfile.tsx";
import SettingsProfilePicture from "./views/settings/SettingsProfilePicture.tsx";
import { ThemeProvider } from "./context/ThemeProvider.tsx";
import SettingsTheme from "./views/settings/SettingsTheme.tsx";
import SettingsGallery from "./views/settings/SettingsGallery.tsx";
import PotentialUsers from "./views/PotentialUsers.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes layout={<Root />} />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <PotentialUsers /> },
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
        path: "settings",
        errorElement: <ErrorPage />,
        element: <SettingsLayout />,
        children: [
          { index: true, element: <SettingsList /> },
          { path: "preferences", element: <SettingsPreferences /> },
          { path: "profile", element: <SettingsProfile /> },
          { path: "picture", element: <SettingsProfilePicture /> },
          { path: "theme", element: <SettingsTheme /> },
          { path: "gallery", element: <SettingsGallery /> },
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
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  </React.StrictMode>
);
