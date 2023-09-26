import { Outlet } from "react-router-dom";
import { Navbar } from "./shared/navbar";
import { ErrorBoundary } from "./components/ErrorBoundry";
import { DawContext, DawProvider } from "./context/dawContext";
import { ToastList } from "./components/ToastList/ToastList";
import { RecordProvider } from "./context/recordContext";
import { SpinningCircle } from "./components/svgs/SpinningCircle";
import { BouncingCircles } from "./components/svgs/BouncingCircles";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <ErrorBoundary>
          <DawProvider>
            <RecordProvider>
              <Outlet />
            </RecordProvider>
          </DawProvider>
        </ErrorBoundary>
      </div>
      <SpinningCircle />
      <BouncingCircles />
      <ToastList />
    </>
  );
};

export default App;
