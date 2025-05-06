import { Outlet, Navigate } from "react-router-dom";
import NavMenu from "./menu/menu";

function App() {


  return (
    <div>
      <NavMenu />
      <Outlet />
    </div>
  );
};

export default App;
