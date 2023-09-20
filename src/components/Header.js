/*
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import { getAuth, signOut } from "firebase/auth";
import { userSignOut } from "../redux/shopSlice";

const Header = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.shop.productData);
  const userInfo = useSelector((state) => state.shop.userInfo);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out OK");
        dispatch(userSignOut());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMenuClick = () => {
    setOpen(!open);
  };

  const renderUserInfo = () => {
    if (userInfo) {
      return (
        <span className="flex flex-col items-start justify-center text-orange-50 bg-red-950 border-black p-1 hover:bg-orange-700 transition-colors duration-300 rounded select-none">
          {userInfo.userName}
        </span>
      );
    } else {
      return (
        <Link
          to="/login"
          className="flex flex-col items-start justify-center text-orange-50 bg-red-950 border-black p-1 hover:bg-orange-700 transition-colors duration-300 rounded"
        >
          Iniciar Sesión
        </Link>
      );
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0 && open) {
        setOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open]);

  return (
    <div className="w-full h-20 bg-orange-50 border-b-[1px] border-b-gray-800 font-titleFont sticky top-0 z-50">
      <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between">
        <Link to="/">
          <div>
            <img
              className="w-36 max-sm:w-24"
              src="https://res.cloudinary.com/dvvzlx2na/image/upload/v1688156943/World%20of%20Warcraft%20-%20Items/Logo/WoW_DF_logo_bronze-PhotoRoom.png-PhotoRoom_tsprp3.png"
              alt="logoWow"
            />
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <ul className="hidden md:flex items-center gap-4">
            <Link to="/" onClick={handleMenuClick}>
              <li
                className={`text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300 text-center ${
                  open ? "flex justify-center" : ""
                }`}
              >
                <span className="decoration-[1px] bg-gradient-to-r from-black to-transparent bg-repeat-x bg-center"></span>
                Inicio
                <span className="decoration-[1px] bg-gradient-to-r from-black to-transparent bg-repeat-x bg-center"></span>
              </li>
            </Link>
            <a href="/#products-section" onClick={handleMenuClick}>
              <li
                className={`text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300 text-center ${
                  open ? "flex justify-center" : ""
                }`}
              >
                <span className="decoration-[1px] bg-gradient-to-r from-black to-transparent bg-repeat-x bg-center"></span>
                Productos
                <span className="decoration-[1px] bg-gradient-to-r from-black to-transparent bg-repeat-x bg-center"></span>
              </li>
            </a>
            <a href="#footer-section" onClick={handleMenuClick}>
              <li
                className={`text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300 text-center ${
                  open ? "flex justify-center" : ""
                }`}
              >
                <span className="decoration-[1px] bg-gradient-to-r from-black to-transparent bg-repeat-x bg-center"></span>
                Contacto
                <span className="decoration-[1px] bg-gradient-to-r from-black to-transparent bg-repeat-x bg-center"></span>
              </li>
            </a>
          </ul>
          <Link to="/cart">
            <div className="relative">
              <img
                className="w-10"
                src="https://res.cloudinary.com/dvvzlx2na/image/upload/v1687563505/World%20of%20Warcraft%20-%20Items/Imagenes-variadas/Bag-WOW_y3c3re.png"
                alt="cartImg"
              />
              <span className="text-white absolute w-12 top-3 left-0 text-sm flex items-center justify-center font-semibold">
                {productData.length}
              </span>
            </div>
          </Link>
          <div className="flex items-center text-center">
            {renderUserInfo()}
            {userInfo && (
              <div
                onClick={handleLogout}
                className="cursor-pointer flex flex-col justify-center items-center ml-2"
              >
                <GrLogout className="text-2xl ml-1 mr-1 hover:scale-125 transition-all duration-300" />
              </div>
            )}
          </div>
          <button className="md:hidden mr-4" onClick={handleMenuClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div
          className="md:hidden bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm"
          onClick={handleMenuClick}
        ></div>
      )}
      <div
        className={`md:hidden ${
          open ? "w-60 h-screen" : "h-0"
        } bg-orange-50 fixed transform origin-top right-0 top-0 overflow-y-auto transition-all duration-300`}
      >
        <div className={`md:hidden ${!open && "hidden"} grid gap-4 pt-3 gap`}>
          <button
            className="mr-4 text-white mb-14"
            onClick={handleMenuClick}
          ></button>
          <Link to="/" onClick={handleMenuClick}>
            <li
              className={`text-2xl text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300 text-center ${
                open ? "flex justify-center" : ""
              }`}
            >
              Inicio
            </li>
          </Link>
          <a href="/#products-section" onClick={handleMenuClick}>
            <li
              className={`text-2xl text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300 text-center ${
                open ? "flex justify-center" : ""
              }`}
            >
              Productos
            </li>
          </a>
          <a href="#footer-section" onClick={handleMenuClick}>
            <li
              className={`text-2xl text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300 text-center ${
                open ? "flex justify-center" : ""
              }`}
            >
              Contacto
            </li>
          </a>
        </div>
        {open && (
          <button
            className="md:hidden fixed top-2 right-2"
            onClick={handleMenuClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
*/

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import { userSignOut } from "../redux/shopSlice";

const Header = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.shop.productData);
  const userInfo = useSelector((state) => state.shop.userInfo);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(userSignOut());
  };

  const handleMenuClick = () => {
    setOpen(!open);
  };

  const renderUserInfo = () => {
    if (userInfo) {
      return (
        <span className="flex flex-row items-center text-orange-50 bg-red-950 border-black p-1 hover:bg-orange-700 transition-colors duration-300 rounded select-none">
          {userInfo.userName}
          {userInfo.verified && (
            <img
              className="w-6 h-6 object-contain max-sm:mr-1 ml-1"
              src="https://res.cloudinary.com/dvvzlx2na/image/upload/v1695179144/World%20of%20Warcraft%20-%20Items/Imagenes-variadas/Verified-Icon_ddx1ku.png"
              alt="Verified Icon"
            />
          )}
        </span>
      );
    } else {
      return (
        <Link
          to="/login"
          className="flex flex-col items-start justify-center text-orange-50 bg-red-950 border-black p-1 hover:bg-orange-700 transition-colors duration-300 rounded"
        >
          Iniciar Sesión
        </Link>
      );
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0 && open) {
        setOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open]);

  console.log("userInfo en Header:", userInfo); // Agrega este console.log

  return (
    <div className="w-full h-20 bg-orange-50 border-b-[1px] border-b-gray-800 font-titleFont sticky top-0 z-50">
      <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between">
        <Link to="/">
          <div>
            <img
              className="w-36 max-sm:w-24"
              src="https://res.cloudinary.com/dvvzlx2na/image/upload/v1688156943/World%20of%20Warcraft%20-%20Items/Logo/WoW_DF_logo_bronze-PhotoRoom.png-PhotoRoom_tsprp3.png"
              alt="logoWow"
            />
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <ul className="hidden md:flex items-center gap-4">
            <Link to="/" onClick={handleMenuClick}>
              <li
                className={`text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300 text-center ${
                  open ? "flex justify-center" : ""
                }`}
              >
                <span className="decoration-[1px] bg-gradient-to-r from-black to-transparent bg-repeat-x bg-center"></span>
                Inicio
                <span className="decoration-[1px] bg-gradient-to-r from-black to-transparent bg-repeat-x bg-center"></span>
              </li>
            </Link>
            <a href="/#products-section" onClick={handleMenuClick}>
              <li
                className={`text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300 text-center ${
                  open ? "flex justify-center" : ""
                }`}
              >
                <span className="decoration-[1px] bg-gradient-to-r from-black to-transparent bg-repeat-x bg-center"></span>
                Productos
                <span className="decoration-[1px] bg-gradient-to-r from-black to-transparent bg-repeat-x bg-center"></span>
              </li>
            </a>
            <a href="#footer-section" onClick={handleMenuClick}>
              <li
                className={`text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300 text-center ${
                  open ? "flex justify-center" : ""
                }`}
              >
                <span className="decoration-[1px] bg-gradient-to-r from-black to-transparent bg-repeat-x bg-center"></span>
                Contacto
                <span className="decoration-[1px] bg-gradient-to-r from-black to-transparent bg-repeat-x bg-center"></span>
              </li>
            </a>
          </ul>
          <Link to="/cart">
            <div className="relative">
              <img
                className="w-10"
                src="https://res.cloudinary.com/dvvzlx2na/image/upload/v1687563505/World%20of%20Warcraft%20-%20Items/Imagenes-variadas/Bag-WOW_y3c3re.png"
                alt="cartImg"
              />
              <span className="text-white absolute w-12 top-3 left-0 text-sm flex items-center justify-center font-semibold">
                {productData.length}
              </span>
            </div>
          </Link>
          <div className="flex items-center text-center">
            {renderUserInfo()}
            {userInfo && (
              <div
                onClick={handleLogout}
                className="cursor-pointer flex flex-col justify-center items-center ml-2"
              >
                <GrLogout className="text-2xl ml-1 mr-1 hover:scale-125 transition-all duration-300" />
              </div>
            )}
          </div>
          <button className="md:hidden mr-4" onClick={handleMenuClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div
          className="md:hidden bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm"
          onClick={handleMenuClick}
        ></div>
      )}
      <div
        className={`md:hidden ${
          open ? "w-60 h-screen" : "h-0"
        } bg-orange-50 fixed transform origin-top right-0 top-0 overflow-y-auto transition-all duration-300`}
      >
        <div className={`md:hidden ${!open && "hidden"} grid gap-4 pt-3 gap`}>
          <button
            className="mr-4 text-white mb-14"
            onClick={handleMenuClick}
          ></button>
          <Link to="/" onClick={handleMenuClick}>
            <li
              className={`text-2xl text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300 text-center ${
                open ? "flex justify-center" : ""
              }`}
            >
              Inicio
            </li>
          </Link>
          <a href="/#products-section" onClick={handleMenuClick}>
            <li
              className={`text-2xl text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300 text-center ${
                open ? "flex justify-center" : ""
              }`}
            >
              Productos
            </li>
          </a>
          <a href="#footer-section" onClick={handleMenuClick}>
            <li
              className={`text-2xl text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300 text-center ${
                open ? "flex justify-center" : ""
              }`}
            >
              Contacto
            </li>
          </a>
        </div>
        {open && (
          <button
            className="md:hidden fixed top-2 right-2"
            onClick={handleMenuClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;