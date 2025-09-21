// EXTERNAL IMPORTS
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// INTERNAL IMPORTS
import Header from "../components/common-components/Header";

const CustomerLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((store) => store.user);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main
        className={`${
          menuOpen ? (user ? "mt-85" : "mt-68") : ""
        } transition-all duration-300`}
      >
        <Outlet />
      </main>
    </>
  );
};
export default CustomerLayout;
