import { Outlet } from "react-router-dom";
import MYNavbar from "../comoponents/ui/MYNavbar";

const MainLayout = () => {
  return (
    <>
    <div className="max-w-7xl mx-auto p-4 md:p-6  border-gray-200 rounded-lg shadow-sm">
      <MYNavbar />
      <Outlet />
    </div>
    </>
    
  );
};

export default MainLayout;