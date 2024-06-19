import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RootRoute } from "./routes/root";
import { ErrorPage } from "./routes/error-page";
import {
  ActivitiesRoute,
  loader as activitiesLoader,
  action as activitiesAction,
} from "./routes/activities";
import {
  ActivityRoute,
  loader as activityLoader,
  action as activityAction,
} from "./routes/activity";
import { AboutRoute } from "./routes/about";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <ActivitiesRoute />,
        loader: activitiesLoader,
        action: activitiesAction,
      },
      {
        path: "/about",
        element: <AboutRoute />,
      },
      {
        path: "/activities/:activityId",
        element: <ActivityRoute />,
        loader: activityLoader,
        action: activityAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
