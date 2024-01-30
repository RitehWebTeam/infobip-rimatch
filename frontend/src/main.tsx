import React from "react";
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
import Preferences from "./views/Preferences.tsx";
import MatchesPage from "./views/MatchesPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes layout={<Root />} />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MatchCard /> },
      {
        path: "matches",
        element: <MatchesPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/init/preferences",
    element: <Preferences />,
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
