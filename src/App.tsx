import { Outlet } from "react-router-dom";
import { Navbar } from "./shared/navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default App;
