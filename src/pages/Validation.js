import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { verifyUser } from "../axios/axios-user";
import { setVerified } from "../redux/shopSlice";

const Validation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.shop.userInfo);
  const [code, setCode] = useState("");
  const [errCode, setErrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // Verifica si la cuenta ya está validada y el usuario está logeado
  useEffect(() => {
    if (!userInfo) {
      navigate("/"); // Redirige al inicio si no está logeado
    } else if (userInfo && userInfo.verified) {
      // Si la cuenta está validada, establece isVerified en true
      setIsVerified(true);
    }
  }, [userInfo, navigate]);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
    setErrCode("");
  };

  const handleValidation = async (e) => {
    e.preventDefault();

    if (!code) {
      setErrCode("Ingresa el código de validación");
      return;
    }

    setLoading(true);

    if (!userInfo) {
      setErrCode("No se pudo obtener la información del usuario");
      setLoading(false);
      return;
    }

    try {
      await verifyUser(userInfo.email, code);
      dispatch(setVerified());
      setSuccessMsg("¡Validación exitosa!");
    } catch (error) {
      setLoading(false);
      setErrCode(error.message);
    }
  };

  return (
    <div className="w-full pt-32">
      <div className="w-full pb-32">
        {isVerified ? (
          <div className="my-20 w-[350px] mx-auto flex flex-col items-center bg-green-50 p-2 border border-green-800 rounded-t-2xl">
            <p className="text-green-600 text-sm font-semibold mt-2 text-center">
              ¡Tu cuenta ha sido validada con éxito!
            </p>
            <Link to="/" className="font-bold">
              Ir al inicio
            </Link>
          </div>
        ) : (
          <form className="w-[350px] mx-auto flex flex-col items-center bg-orange-50 p-2 border border-orange-800 rounded-t-2xl">
            <div className="w-full border border-orange-900 p-6 rounded-t-2xl">
              <h2 className="font-titleFont text-3xl font-medium mb-4">
                Revisa el código enviado a tu email
              </h2>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">Código de Validación</p>
                  <input
                    onChange={handleCodeChange}
                    value={code}
                    className="w-full lowercase py-1 border border-gray-600 px-2 text-base rounded-sm outline-none"
                    type="text"
                  />
                  {errCode && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>{" "}
                      {errCode}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleValidation}
                  className="w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-orange-500 to-orange-300 hover:from-orange-600 hover:to-orange-400 border border-orange-900 active:border-yellow-800"
                >
                  Validar
                </button>
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
                {successMsg && (
                  <div className="text-green-600 text-sm font-semibold mt-2 text-center">
                    {successMsg}
                  </div>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Validation;