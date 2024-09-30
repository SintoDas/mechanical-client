import { Outlet } from "react-router-dom";
import MYNavbar from "../comoponents/ui/MYNavbar";
import CustomFooter from "../comoponents/ui/CustomFooter";

const MainLayout = () => {
  return (
    <div className="min-h-screen">
    {/* Navbar */}
    <MYNavbar />

    {/* Main Content Area */}
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-4">
      <Outlet />
    </div>

    {/* Footer */}
    <CustomFooter />
  </div>
  );
};

export default MainLayout;
