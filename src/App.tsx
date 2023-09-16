import { Outlet } from "react-router-dom";
import { Navbar } from "./shared/navbar";
import { ErrorBoundary } from "./components/ErrorBoundry";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default App;
