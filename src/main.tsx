import React from "react";
import "./index.css";
import "./assets/custom.scss";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./shared/error-page";
import App from "./App";
import { DawDetail } from "./routes/daws/DawDetail";
import { DawsList } from "./routes/daws/DawsList";
import { ToastsDemo } from "./routes/toasts/ToastsDemo";
import { RecordLibrary } from "./routes/records/RecordLibrary";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { FancyAnimation } from "./routes/cssAnimation/FancyAnimation";
import { createRoot } from "react-dom/client";

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

const rootContainer = document.getElementById("root");
if (!rootContainer) {
  throw new Error("No root container found");
}
const root = createRoot(rootContainer);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
