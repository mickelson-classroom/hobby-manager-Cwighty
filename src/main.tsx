import React from "react";
import "./index.css";
import "./assets/custom.scss";
import "bootstrap";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import ErrorPage from "./shared/error-page";
import App from "./App";
import ReactDOM from "react-dom";
import { DawDetail } from "./routes/daws/DawDetail";
import { DawsList } from "./routes/daws/DawsList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <DawsList />,
      },
      {
        path: "daws/",
        element: <DawsList />,
      },
      {
        path: "daw/:dawId",
        element: <DawDetail />,
      },
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);
