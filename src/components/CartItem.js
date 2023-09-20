import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  deleteItem,
  incrementQuantity,
  resetCart,
} from "../redux/shopSlice";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const CartItem = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.shop.productData);
  
  return (
    <div className="w-full max-sm:flex max-sm:flex-col max-sm:items-center">
      <div className="w-full">
        <h2 className="font-titleFont text-2xl text-center">Productos añadidos</h2>
      </div>
      <div>
        {productData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center md:justify-between gap-6 mt-6"
          >
            <div className="flex items-center gap-2">
              <MdOutlineClose
                onClick={() =>
                  dispatch(deleteItem(item.id)) &
                  toast.error(`${item.title} fue removido`)
                }
                className="text-xl text-gray-600 hover:text-red-600 cursor-pointer duration-300"
              />
              <img
                className="w-32 h-32 object-cover rounded-2xl"
                src={item.image}
                alt="productImg"
              />
            </div>
            <div className="md:w-44 text-center">
              <h2>{item.title}</h2>
            </div>
            <div className="md:w-10">
              <p>${item.price}</p>
            </div>
            <div className="flex items-center flex-col justify-between w-full sm:w-1/4 text-gray-500 gap-4 border p-3">
              <p className="text-sm">Cantidad</p>
              <div className="flex items-center gap-4 text-sm font-semibold">
                <span
                  onClick={() =>
                    dispatch(
                      decrementQuantity({
                        id: item.id,
                        title: item.title,
                        image: item.img,
                        price: item.price,
                        quantity: 1,
                        description: item.desc,
                      })
                    )
                  }
                  className="select-none border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                >
                  -
                </span>
                {item.quantity}
                <span
                  onClick={() =>
                    dispatch(
                      incrementQuantity({
                        id: item.id,
                        title: item.title,
                        image: item.img,
                        price: item.price,
                        quantity: 1,
                        description: item.desc,
                      })
                    )
                  }
                  className="select-none border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                >
                  +
                </span>
              </div>
            </div>
            <div className="md:w-14 max-md:border-b-4 max-md:border-orange-500">
              <p>${item.quantity * item.price} </p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() =>
          dispatch(resetCart()) & toast.error("Tu carrito está vacío!")
        }
        className="bg-red-500 text-white mt-8 ml-7 py-1 px-6 hover:bg-red-800 duration-300"
      >
        Vaciar carrito
      </button>
      <Link to="/">
        <button className="mt-8 ml-7 flex items-center gap-1 text-gray-400 hover:text-black duration-300">
          <span>
            <HiOutlineArrowLeft />
          </span>
          Volver al inicio
        </button>
      </Link>
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
    </div>
  );
};

export default CartItem;


