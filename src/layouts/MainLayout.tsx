import { Outlet } from "react-router-dom";
import MYNavbar from "../comoponents/ui/MYNavbar";
import CustomFooter from "../comoponents/ui/CustomFooter";


const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="h-16">
        <MYNavbar />
      </header>

      {/* Main Content Area */}
      <main className="flex-grow mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="h-16">
        <CustomFooter />
      </footer>
    </div>
  );
};

export default MainLayout;
