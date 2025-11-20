import React from "react";
import { Link, Links,useNavigate } from 'react-router-dom'
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Avatar } from 'primereact/avatar';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  
  const navigate=useNavigate()


  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");   // if you store jwt
    // setUsername("");/
    toast.success("You are logged out",{autoClose:2000})
    setTimeout(() => {
    navigate("/verify");
  }, 2000);
  };

  const username=localStorage.getItem("username")
const firstLetter = username ? username.charAt(0).toUpperCase() : "U";
  return (
    <div className="bg-sky-950 px-8 py-2 shadow-md">
      <nav className="flex items-center justify-between">

        {/* Logo */}
        <div className="text-white text-3xl font-bold">
          <span className="text-4xl font-extrabold">E</span>kart
        </div>

         <div className='text-2xl text-white font-bold space-x-2'>S E L L E R  P A N E L</div>

        {/* Right Side Items */}
        <ul className="flex items-center gap-12 text-white text-lg  no-underline">
          <li>
            <Link
              to="/"
              className="hover:text-gray-200 text-white decoration-0 transition no-underline"
            >
              Home
            </Link>
          </li>

          <li>
            <Avatar
              label={firstLetter}
              className="bg-white text-pink-600 font-bold"
              size="large"
              shape="circle"
            />
          </li>

          <li>
            <div onClick={handleLogout}><i className="pi pi-user" style={{ fontSize: '2rem' }}></i></div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
