import { Outlet } from "react-router-dom";
import { Navbar } from "./shared/navbar";
import { ErrorBoundary } from "./components/ErrorBoundry";
import { DawContext, DawProvider } from "./context/dawContext";
import { ToastList } from "./components/ToastList/ToastList";
import { SpinningCircle } from "./components/svgs/SpinningCircle";
import { BouncingCircles } from "./components/svgs/BouncingCircles";

const App = () => {
  return (
    <>
      <Navbar />
      <div
        className="container align-items-start"
        style={{ marginBottom: "100px" }}
      >
        <ErrorBoundary>
          <DawProvider>
            <Outlet />
          </DawProvider>
        </ErrorBoundary>
      </div>
      <SpinningCircle />
      <ToastList />
    </>
  );
};

export default App;
