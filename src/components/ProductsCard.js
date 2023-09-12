import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { ImFire } from "react-icons/im";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/shopSlice";
import { ToastContainer, toast } from "react-toastify";

const ProductsCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = product.title;
  const idString = (id) => {
    return String(id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(id);
  const handleDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: product,
      },
    });
  };
  return (
    <div className="px-2">
    <div className="group relative">
      <div
        onClick={handleDetails}
        className="w-full h-64 md:h-96 cursor-pointer overflow-hidden rounded-t-2xl"
      >
        <img
          className="w-full h-full object-cover max-sm:h-80 max-md: group-hover:scale-105 duration-500"
          src={product.img}
          alt="productImg"
        />
      </div>
      <div className="bg-zinc-50 w-full border-l-2 border-r-2 border-b-2 border-black px-2 py-4 rounded-b-2xl ">
        <div className="flex flex-col justify-between items-center gap-4">
          <div>
            <h2 className="font-titleFont text-base font-bold">
              {product.title}
            </h2>
          </div>
          <div className="flex justify-center gap-2 relative overflow-hidden w-28 text-sm">
            <div className="flex gap-2 transform group-hover:translate-y-24 transition-transform duration-500">
              <p className="line-through text-gray-500">{product.oldPrice}</p>
              <p className="font-semibold">${product.price}</p>
            </div>
            <p
              onClick={() =>
                dispatch(
                  addToCart({
                    id: product.id,
                    title: product.title,
                    image: product.img,
                    price: product.price,
                    quantity: 1,
                    description: product.desc,
                  })
                ) & toast.success(`${product.title} fue añadido `)
              }
              className=" justify-center absolute z-20  w-[100px] text-green-600 font-semibold hover:text-gray-900 flex items-center gap-1 top-0 transform -translate-y-32 group-hover:translate-y-0 transition-transform cursor-pointer duration-500"
            >
              Comprar{" "}
              <span>
                <BsArrowRight />
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <p>{product.category}</p>
        </div>
        <div className="absolute top-4 right-0">
          {product.isNew && (
            <p className="bg-black text-orange-600 font-semibold font-titleFont px-6 py-2 rounded-full">
              <ImFire />
            </p>
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
    </div>
    </div>
  );
};

export default ProductsCard;
