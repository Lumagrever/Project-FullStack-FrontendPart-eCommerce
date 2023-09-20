/*import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { resetCart } from "../redux/shopSlice";
import { RotatingLines } from "react-loader-spinner";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productData = useSelector((state) => state.shop.productData);
  const userInfo = useSelector((state) => state.shop.userInfo);
  const [totalAmt, setTotalAmt] = useState("");
  //const [payNow, setPayNow] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [productData]);

  const handleCheckout = () => {
    if (userInfo) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccessMsg("¡Felicidades por tu compra, volvamos al inicio!");
        dispatch(resetCart());
        setTimeout(() => {
          navigate("/");
        }, 5000);
      }, 2000);
    } else {
      toast.error("Por favor inicia sesión para pagar");
    }
  };

  return (
    <div className="mx-auto max-md:container">
      {successMsg ? (
        <div className="flex justify-center items-center py-60">
          <p className="border-[1px] border-green-600 text-green-500 font-bold px-6 py-2">
            {successMsg}
          </p>
        </div>
      ) : (
        <>
          <img
            className="w-full h-60 object-cover max-md:hidden"
            src="https://res.cloudinary.com/dvvzlx2na/image/upload/v1687567333/World%20of%20Warcraft%20-%20Items/Imagenes-variadas/Cart-WOW_tkttpo.webp"
            alt="cartImg"
          />
          <div className="px-20 max-lg:px-0 max-w-screen-xl py-20 flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
              <CartItem />
            </div>
            <div className="w-full  bg-gray-100 py-6 px-4">
              <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6 max-lg: text-center max-lg:">
                <h2 className="text-2xl font-medium">Carrito de compras</h2>
                <p className="flex items-center gap-4 text-base font-bold text-col">
                  Subtotal{" "}
                  <span className="font-bold text-lg">${totalAmt}</span>
                </p>
                <p className="flex items-start gap-4 text-base font-bold text-orange-900">
                  Beneficios{" "}
                  <span>
                    Contribuimos con el 2% del valor total de tu compra para
                    llevar alimentos a los niños huérfanos de Ventormenta.
                  </span>
                </p>
              </div>
              <p className="font-bold flex items-center gap-4 text-base">
                Total <span className="text-xl">${totalAmt}</span>
              </p>

              {productData.length > 0 && (
                <button
                  onClick={handleCheckout}
                  className="text-base font-bold bg-black w-full py-3 mt-6 hover:bg-gray-800 duration-300 rounded-sm bg-gradient-to-t from-orange-500 to-orange-300 hover:from-orange-600 hover:to-orange-400 border border-orange-900 active:border-yellow-800"
                >
                  Pagar
                </button>
              )}
              {loading && (
                <div className="flex justify-center">
                  <RotatingLines
                    strokeColor="brown"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="50"
                    visible={true}
                  />
                </div>
              )}
            </div>
          </div>
          <ToastContainer className="max-sm:w-2/3" 
            position="top-left"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </>
      )}
    </div>
  );
};

export default Cart;*/

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { resetCart } from "../redux/shopSlice";
import { RotatingLines } from "react-loader-spinner";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productData = useSelector((state) => state.shop.productData);
  const userInfo = useSelector((state) => state.shop.userInfo);
  const [totalAmt, setTotalAmt] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [productData]);

  const handleCheckout = () => {
    if (userInfo && userInfo.verified) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccessMsg("¡Felicidades por tu compra, volvamos al inicio!");
        dispatch(resetCart());
        setTimeout(() => {
          navigate("/");
        }, 5000);
      }, 2000);
    } else if (userInfo && !userInfo.verified) {
      // Usuario logeado pero no verificado, mostrar mensaje de error y botón para validar el correo.
      toast.error("Debes validar tu Email para realizar la compra.");
    } else {
      // No hay un usuario logeado, mostrar mensaje de error.
      toast.error("Debes iniciar sesión para realizar la compra.");
    }
  };

  return (
    <div className="mx-auto max-md:container">
      {successMsg ? (
        <div className="flex justify-center items-center py-60">
          <p className="border-[1px] border-green-600 text-green-500 font-bold px-6 py-2">
            {successMsg}
          </p>
        </div>
      ) : (
        <>
          <img
            className="w-full h-60 object-cover max-md:hidden"
            src="https://res.cloudinary.com/dvvzlx2na/image/upload/v1687567333/World%20of%20Warcraft%20-%20Items/Imagenes-variadas/Cart-WOW_tkttpo.webp"
            alt="cartImg"
          />
          <div className="px-20 max-lg:px-0 max-w-screen-xl py-20 flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
              <CartItem />
            </div>
            <div className="w-full  bg-gray-100 py-6 px-4">
              <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6 max-lg: text-center max-lg:">
                <h2 className="text-2xl font-medium">Carrito de compras</h2>
                <p className="flex items-center gap-4 text-base font-bold text-col">
                  Subtotal{" "}
                  <span className="font-bold text-lg">${totalAmt}</span>
                </p>
                <p className="flex items-start gap-4 text-base font-bold text-orange-900">
                  Beneficios{" "}
                  <span>
                    Contribuimos con el 2% del valor total de tu compra para
                    llevar alimentos a los niños huérfanos de Ventormenta.
                  </span>
                </p>
              </div>
              <p className="font-bold flex items-center gap-4 text-base">
                Total <span className="text-xl">${totalAmt}</span>
              </p>

              {productData.length > 0 && (
                <button
                  onClick={handleCheckout}
                  className="text-base font-bold bg-black w-full py-3 mt-6 hover:bg-gray-800 duration-300 rounded-sm bg-gradient-to-t from-orange-500 to-orange-300 hover:from-orange-600 hover:to-orange-400 border border-orange-900 active:border-yellow-800"
                >
                  Pagar
                </button>
              )}
              {!loading && userInfo && !userInfo.verified && (
                // Mostrar el botón para validar el correo
                <Link to="/validation">
                  <button className="text-base font-bold w-full py-3 mt-2 hover:bg-gray-800 duration-300 rounded-sm bg-gradient-to-t from-red-500 to-red-300 hover:from-red-600 hover:to-red-400 border border-red-900 active:border-red-800">
                    Validar Email
                  </button>
                </Link>
              )}
              {loading && (
                <div className="flex justify-center">
                  <RotatingLines
                    strokeColor="brown"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="50"
                    visible={true}
                  />
                </div>
              )}
            </div>
          </div>
          <ToastContainer className="max-sm:w-2/3" 
            position="top-left"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </>
      )}
    </div>
  );
};

export default Cart;