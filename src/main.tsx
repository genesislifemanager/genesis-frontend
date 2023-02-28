import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/root";
import Home from "./routes/home/home";
import SignUp from "./routes/signup";
import Overview from "./routes/home/overview";
import TimeBlocks from "./routes/home/timeblocks";
import TimeBlock from "./routes/home/timeblock";
import CreateTimeBlock from "./routes/home/create-timeblock";
import Calendar from "./routes/home/calendar";
import "./index.css";

import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import SelectedDay from "./routes/home/selected-day";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {        
        element: <Home />,
        children: [
          { path:"home/overview", element: <Overview /> },
          {
            path: "home/timeblocks",
            element: <TimeBlocks />,
            children: [
              {
                index: true,
                element: <SelectedDay />,
              },
              {
                path: "create",
                element: <CreateTimeBlock />,
              },
              {
                path:":timeBlockId",
                element:<TimeBlock/>
              }
            ],
          },
          { path: "home/calendar", element: <Calendar /> },
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
