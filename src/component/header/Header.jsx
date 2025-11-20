import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import appRoute from "./appRoute";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { CartContext } from "../../context/CartContext";
import "react-toastify/dist/ReactToastify.css";
import "./Header.css";

const Header = ({ active }) => {
  const location = useLocation();

 
  const hideHeaderRoutes = [
  "/dashboard",
  "/login",
  "/seller",
  "/verify",
];

const shouldHideHeader = hideHeaderRoutes.some(path =>
  location.pathname.startsWith(path)
);


  // If route is admin/seller → hide header
  if (shouldHideHeader) return null;

  const navRoute = appRoute.filter((item) => item.name);

  const navigate = useNavigate();
  const { logoutCart } = useContext(CartContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    logoutCart();
    setIsLoggedIn(false);

    toast("🦄 You are logged out!", {
      position: "top-right",
      autoClose: 2000,
      theme: "light",
      transition: Bounce,
    });

    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <div className="head">
      <nav>
        <div className="ekart" style={{ fontSize: "26px", fontWeight: "bold" }}>
          <span style={{ fontSize: "36px", fontWeight: "bolder" }}>E</span>kart
        </div>

        <ul>
          {navRoute.map((item, id) => (
            <li key={id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "head2 active" : "head2"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex gap-6 text-2x mt-3">
          {isLoggedIn ? (
            <>
              <Link to="/cart" style={{ color: "white", fontSize: 26 }}>
                <FaCartShopping className="i" />
              </Link>

              <span
                style={{ fontSize: 26, cursor: "pointer", marginLeft: 10 }}
                onClick={handleLogout}
              >
                <AiOutlineLogout className="i" />
              </span>
            </>
          ) : (
            <Link to="/sign" style={{ color: "white", fontSize: 26 }}>
              <FaUser className="i" />
            </Link>
          )}
        </div>
      </nav>

      <ToastContainer />
    </div>
  );
};

export default Header;
