import { RiChat3Line } from "react-icons/ri";
import { Outlet } from "react-router-dom";
import Aside from "../components/Aside";
import Left from "../components/Left";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-[80px_400px_auto] h-screen">
      <Aside />
      <Left />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
