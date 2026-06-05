import Navbar from "./navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout;
