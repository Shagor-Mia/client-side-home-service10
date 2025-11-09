import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useNavigation } from "react-router";

const MainLayout = () => {
  const { state } = useNavigation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="max-w-screen-xl mx-auto w-screen px-4 md:px-8 lg:px-12 py-4 md:py-8 lg:py-12 flex-1 bg-[#f5f5f5] ">
        {state == "loading" ? <Loading /> : <Outlet />}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
