import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Root from "./routes/root";
import Home from "./routes/home/home";
import Organize from "./routes/organize/organize";
import Projects from "./routes/organize/projects";
import SignUp from "./routes/signup";
import Overview from "./routes/home/overview";
import TimeBlocks from "./routes/home/timeblocks";
import SelectedDay from "./routes/home/selected-day";
import CreateTimeBlock from "./routes/home/create-timeblock";
import TimeBlock from "./routes/home/timeblock";
import Calendar from "./routes/home/calendar";
import Project from "./routes/organize/project";
import "./index.css";
import CreateProject from "./routes/organize/create-project";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        element: <Home />,
        children: [
          { path: "home/overview", element: <Overview /> },
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
                path: ":id",
                element: <TimeBlock />,
              },
            ],
          },
          { path: "home/calendar", element: <Calendar /> },
        ],
      },
      {        
        element: <Organize />,
        children:[
          {
            path:"organize/projects",
            element:<Projects/>,          
          },
          {
            path:":organize/projects/:id",
            element:<Project/>
          },
          {
            path:"organize/projects/create",
            element:<CreateProject/>
          },
          
        ]
      }
    ],
  },
  {
    path: "/auth/signup",
    element: <SignUp />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
