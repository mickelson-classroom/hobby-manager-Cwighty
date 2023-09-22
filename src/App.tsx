import { Outlet } from "react-router-dom";
import { Navbar } from "./shared/navbar";
import { ErrorBoundary } from "./components/ErrorBoundry";
import { DawContext, DawProvider } from "./context/dawContext";
import { ToastProvider } from "./context/toastContext";
import { ToastList } from "./components/ToastList/ToastList";

const App = () => {
  return (
    <>
      <Navbar />
      <ToastProvider>
        <div className="container">
          <ErrorBoundary>
            <DawProvider>
              <Outlet />
            </DawProvider>
          </ErrorBoundary>
        </div>
        <ToastList />
      </ToastProvider>
    </>
  );
};

export default App;
