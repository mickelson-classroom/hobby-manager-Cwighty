import { Outlet } from "react-router-dom";
import { Navbar } from "./shared/navbar";
import { ErrorBoundary } from "./components/ErrorBoundry";
import { DawContext, DawProvider } from "./context/dawContext";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <ErrorBoundary>
          <DawProvider>
            <Outlet />
          </DawProvider>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default App;
