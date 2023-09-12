import React, { useEffect, useState } from "react";
import { ImFire } from "react-icons/im";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addToCart } from "../redux/shopSlice";
import { ToastContainer, toast } from "react-toastify";

const Product = () => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});
  let [baseQty, setBaseQty] = useState(1);
  const location = useLocation();
  useEffect(() => {
    setDetails(location.state.item);
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto my-10 px-4 md:px-6">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full relative">
          <img
            className="w-full h-auto md:h-[550px] object-cover rounded-2xl"
            src={details.img}
            alt="productImg"
          />
          <div className="absolute top-4 right-0">
            {details.isNew && (
              <p className="bg-black text-orange-600 font-semibold font-titleFont px-6 py-2 rounded-full">
                <ImFire />
              </p>
            )}
          </div>
        </div>
        <div className="w-full md:w-3/5 flex flex-col justify-center gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold">{details.title}</h2>
            <div className="flex items-center gap-4 mt-3">
              <p className="line-through font-base text-gray-500">
                {details.oldPrice}
              </p>
              <p className="text-2xl font-medium text-gray-900">
                ${details.price}
              </p>
            </div>
          </div>
          <p className="text-base text-gray-500 -mt-3">{details.desc}</p>
          <div className="flex gap-4">
            <div className="w-52 flex items-center justify-between text-gray-500 gap-4 border p-3">
              <p className="text-sm">Cantidad</p>
              <div className="flex items-center gap-4 text-sm font-semibold">
                <button
                  onClick={() =>
                    setBaseQty(baseQty === 1 ? (baseQty = 1) : baseQty - 1)
                  }
                  className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                >
                  -
                </button>
                <span>{baseQty}</span>
                <button
                  onClick={() => setBaseQty(baseQty + 1)}
                  className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    id: details.id,
                    title: details.title,
                    price: details.price,
                    image: details.img,
                    quantity: baseQty,
                    description: details.desc,
                  })
                ) & toast.success(`${details.title} fue añadido `)
              }
              className="bg-black text-white py-3 px-6 active:bg-gray-800"
            >
              Comprar
            </button>
          </div>
          <p className="text-base text-gray-500">
            Categoría:{" "}
            <span className="font-medium capitalize"> {details.category} </span>
          </p>
        </div>
      </div>
      <ToastContainer className= "max-sm:w-2/3"
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

export default Product;