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

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <MatchCard /> }],
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
