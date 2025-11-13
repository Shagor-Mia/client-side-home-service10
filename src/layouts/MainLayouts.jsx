import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useNavigation } from "react-router";
import LoadingPage from "../pages/LoadingPage";

const MainLayout = () => {
  const { state } = useNavigation();

  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <div className="max-w-7xl mx-auto w-screen px-4 md:mr-4 mr-0 md:px-8 lg:px-12 py-4 md:py-8 lg:py-12 flex-1 bg-base-100 ">
        {state == "loading" ? <LoadingPage /> : <Outlet />}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
