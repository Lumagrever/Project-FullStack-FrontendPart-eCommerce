import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaHome,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { BsCartPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black text-[#949494] py-20">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div id="footer-section" className="flex flex-col justify-center gap-7">
          <img
            className="w-32"
            src="https://res.cloudinary.com/dvvzlx2na/image/upload/v1686592672/World%20of%20Warcraft%20-%20Items/Logo/blizz_blue_logo_ebbqaa.png"
            alt="LogoBlizzard"
          />
          <p className="text-white text-sm tracking-wide">
            © 2023 Blizzard Entertainment, Inc.
          </p>
          <img
            className="w-56"
            src="https://res.cloudinary.com/dvvzlx2na/image/upload/v1686871693/World%20of%20Warcraft%20-%20Items/Imagenes-variadas/Pay-methods2_jxrc6j.png"
            alt="PayMethods"
          />
          <div className="flex gap-5 text-lg text-gray-400">
            <a href="https://www.youtube.com/@WorldofWarcraftLATAM"><FaYoutube className="hover:text-white duration-300 cursor-pointer" /></a>
            <a href="https://www.facebook.com/Warcraft/?locale=es_LA"><FaFacebookF className="hover:text-white duration-300 cursor-pointer" /></a>
            <a href="https://twitter.com/WarcraftLATAM"><FaTwitter className="hover:text-white duration-300 cursor-pointer" /></a>
            <a href="https://www.instagram.com/warcraft/?hl=es"><FaInstagram className="hover:text-white duration-300 cursor-pointer" /></a>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Contactanos</h2>
          <div className="text-base flex flex-col gap-2">
            <p>Alton Parkway 16215 - Irvine | California</p>
            <p>Celular: (800) 592-5499</p>
            <p>E-mail: soporte@blizzard.com</p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Perfil</h2>
          <div className="flex flex-col gap-2 text-base">
          <Link to="/cart">
          <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
              {" "}
              <span>
                <BsCartPlusFill />
              </span>
              {""}Carrito
            </p>
          </Link>
          <a href="https://us.battle.net/support/es/help">
            <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
              {" "}
              <span>
                <MdLocationOn />
              </span>
              {""}Soporte
            </p>
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <input
            className="bg-transparent border px-4 py-2 text-sm"
            placeholder="e-mail"
            type="text"
          />
          <button className="w-full text-black font-bold text-sm rounded-sm bg-gradient-to-t from-orange-500 to-orange-300 hover:from-orange-600 hover:to-orange-400 border border-orange-900 active:border-yellow-800 rounded-b-2xl">
            Suscribite
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;