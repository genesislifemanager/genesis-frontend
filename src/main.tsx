import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/root";
import Home from "./routes/home/home";
import SignUp from "./routes/signup";
import Overview from "./routes/home/overview";
import TimeBlocks from "./routes/home/timeblocks";
import Calendar from "./routes/home/calendar";
import "./index.css";

import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "home",
        element: <Home />,
        children: [
          { path: "overview", element: <Overview /> },
          { path: "timeblocks", element: <TimeBlocks /> },
          { path: "calendar", element: <Calendar /> },
        ],
      },
    ],
  },
  {
    path: "/auth/signup",
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
