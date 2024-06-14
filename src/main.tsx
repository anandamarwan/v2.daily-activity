import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import { RootRoute } from "./routes/root";
import { ErrorPage } from "./routes/error-page";
import { ActivityRoutes } from "./routes/activity";
import { ActivitiesRoute } from "./routes/activities";
import { AboutRoute } from "./routes/about";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <ActivitiesRoute />,
      },
      {
        path: "/about",
        element: <AboutRoute />,
      },
      {
        path: "/activities/:activityId",
        element: <ActivityRoutes />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
