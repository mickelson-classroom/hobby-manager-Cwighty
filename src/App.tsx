import { Outlet } from "react-router-dom";
import { Navbar } from "./shared/navbar";
import { ErrorBoundary } from "./components/ErrorBoundry";
import { DawProvider } from "./context/dawContext";
import { ToastList } from "./components/ToastList/ToastList";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { ToastProvider } from "./context/toastContext";
import { Toaster, toast } from "react-hot-toast";

const App = () => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error: unknown) => {
        if (error instanceof Error) {
          toast.error("There was an error with your request: " + error.message);
        } else {
          toast.error("There was an error with your request");
        }
      },
    }),
    defaultOptions: {
      queries: {
        useErrorBoundary: false,
      },
    },
  });
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
          <Toaster
            toastOptions={{
              style: {
                background: "#333",
                color: "#fff",
              },
            }}
          />
        </QueryClientProvider>
      </ToastProvider>
    </>
  );
};

export default App;
