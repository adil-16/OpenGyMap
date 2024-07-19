import React, { useEffect, useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaBars } from "react-icons/fa";
import Aside from "../../components/Aside/Aside";

const HomeLayout = () => {
  const [loading, isLoading] = useState(false);
  const navigation = useNavigation();

  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    if (loading || navigation.state == "loading") {
      return <p>Loading....</p>;
    }
  }, []);

  return (
    <div>
      <div className="">
        <Navbar />
      </div>

      {!menu && (
        <div
          className="absolute p-1 lg:hidden z-30  left-8 -mt-12"
          onClick={toggleMenu}
        >
          <FaBars className="text-black text-3xl" />
        </div>
      )}

      {menu && (
        <div className={` fixed  top-0 lg:hidden  z-20 `}>
          <Aside onClick={toggleMenu} />
        </div>
      )}

      {menu && (
        <div
          className="bg-black fixed inset-0 opacity-50 z-10"
          onClick={toggleMenu}
        />
      )}

      <div className={menu ? "overflow-hidden h-screen" : ""}>
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
