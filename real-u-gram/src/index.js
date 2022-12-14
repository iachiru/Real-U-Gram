import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "./context/authContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/profileRelated/SignUp";
import LogIn from "./pages/profileRelated/LogIn";
import ProfileProvider from "./context/ProfileContext";
import Users from "./pages/profileRelated/Users";
import UploadPost from "./pages/postRelated/UploadPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/profile",
    element: <Users />,
  },
  {
    path: "/post",
    element: <UploadPost />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ProfileProvider>
        <RouterProvider router={router} />
      </ProfileProvider>
    </AuthProvider>
  </React.StrictMode>
);
