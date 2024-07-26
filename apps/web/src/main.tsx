import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./globals.css";
import RootLayout from "./layouts/root.layout";
import HomePage from "./pages/home";
import SignInPage from "./pages/sign-in";
import SignUpPage from "./pages/sign-up";
import NotFoundPage from "./pages/404";
import AuthLayout from "./layouts/auth.layout";
import SettingsPage from "./pages/settings";
import CoursesPage from "./pages/courses";
import OnboardingPage from "./pages/onboarding";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <AuthLayout />,
        path: "/onboarding",
        children: [{ path: "/onboarding", element: <OnboardingPage /> }],
      },
      {
        element: <AuthLayout />,
        path: "/home",
        children: [{ path: "/home", element: <HomePage /> }],
      },

      {
        element: <AuthLayout />,
        path: "/courses",
        children: [{ path: "/courses", element: <CoursesPage /> }],
      },
      {
        element: <AuthLayout />,
        path: "settings",
        children: [{ path: "/settings", element: <SettingsPage /> }],
      },

      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
