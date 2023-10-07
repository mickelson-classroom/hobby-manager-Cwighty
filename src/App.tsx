import { Outlet } from "react-router-dom";
import { Navbar } from "./shared/navbar";
import { ErrorBoundary } from "./components/ErrorBoundry";
import { DawProvider } from "./context/dawContext";
import { ToastList } from "./components/ToastList/ToastList";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastProvider } from "./context/toastContext";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <div
            className="container align-items-start d-block"
            style={{ marginBottom: "100px" }}
          >
            <ErrorBoundary>
              <DawProvider>
                <Outlet />
              </DawProvider>
            </ErrorBoundary>
          </div>
          <ToastList />
        </QueryClientProvider>
      </ToastProvider>
    </>
  );
};

export default App;
