import { Outlet } from "react-router-dom";
import MYNavbar from "../comoponents/ui/MYNavbar";


const MainLayout = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Navbar section */}
      <MYNavbar />

      {/* Content section to render the Outlet with spacing adjustments */}
      <div className="mt-10 min-h-[calc(100vh-40px)]">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;