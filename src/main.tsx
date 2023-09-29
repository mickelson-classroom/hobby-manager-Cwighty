import React from "react";
import "./index.css";
import "./assets/custom.scss";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import ErrorPage from "./shared/error-page";
import App from "./App";
import ReactDOM from "react-dom";
import { DawDetail } from "./routes/daws/DawDetail";
import { DawsList } from "./routes/daws/DawsList";
import { ToastsDemo } from "./routes/toasts/ToastsDemo";
import { RecordLibrary } from "./routes/records/RecordLibrary";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { FancyAnimation } from "./routes/cssAnimation/FancyAnimation";

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
      { path: "daw/:dawId", element: <DawDetail /> },
      { path: "toasts", element: <ToastsDemo /> },
      { path: "records", element: <RecordLibrary /> },
      { path: "wow", element: <FancyAnimation /> },
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
