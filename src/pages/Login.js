/*
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/shopSlice";

export const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  // Manejo de errores Firebase
  const [userEmailErr, setUserEmailErr] = useState("");
  const [userPassErr, setUserPassErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setErrEmail("Ingresa tu email");
    }
    if (!password) {
      setErrPassword("Ingresa tu contraseña");
    }
    if (email && password) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch(setUserInfo({
            _id:user.uid,
            userName:user.displayName,
            email:user.email,
            image:user.photoURL,
          }))
          // ...
          setLoading(false);
          setSuccessMsg("Te conectaste con exito, vamos al inicio!");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          if (error.code.includes("auth/invalid-email")) {
            setUserEmailErr("Email Inválido");
          }

          if (errorCode.includes("auth/wrong-password")) {
            setUserPassErr("Contraseña incorrecta");
          }
          console.log(
            "Algo raro esta sucediendo, intenta de nuevo con una credencial existente"
          );
        });
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="w-full pt-32">
      <div className="w-full pb-32">
        {successMsg ? (
          <div className="w-full flex justify-center items-center py-32">
            <p className="border-[1px] border-green-600 text-green-500 font-titleFont text-lg font-semibold px-6 py-2">
              {" "}
              {successMsg}{" "}
            </p>{" "}
          </div>
        ) : (
          <form className="w-[350px] mx-auto flex flex-col items-center bg-orange-50 p-2 border border-orange-800 rounded-t-2xl">
            <div className="w-full border border-orange-900 p-6 rounded-t-2xl">
              <h2 className="font-titleFont text-3xl font-medium mb-4">
                Iniciar Sesión
              </h2>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">Email</p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full lowercase py-1 border border-gray-600 px-2 text-base rounded-sm outline-none"
                    type="email"
                  />
                  {errEmail && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>{" "}
                      {errEmail}
                    </p>
                  )}
                  {userEmailErr && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>{" "}
                      {userEmailErr}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">Contraseña</p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full lowercase py-1 border border-gray-600 px-2 text-base rounded-sm outline-none"
                    type="password"
                  />
                  {errPassword && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>{" "}
                      {errPassword}
                    </p>
                  )}
                  {userPassErr && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>{" "}
                      {userPassErr}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleLogin}
                  className="w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-orange-500 to-orange-300 hover:from-orange-600 hover:to-orange-400 border border-orange-900 active:border-yellow-800"
                >
                  Conectar
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
              </div>
            </div>
            <p className="w-full text-xs text-gray-600 mt-4 flex items-center">
              <span className="w-1/3 h-[1px] bg-orange-900  inline-flex"></span>
              <span className="w-1/3 text-center">¿No tenes cuenta?</span>
              <span className="w-1/3 h-[1px] bg-orange-900  inline-flex"></span>
            </p>
            <Link className="w-full" to="/registration">
              <button className="w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-orange-500 to-orange-300 hover:from-orange-600 hover:to-orange-400 border border-orange-900 active:border-yellow-800">
                Registrate
              </button>
            </Link>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
*/

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { setUserInfo } from "../redux/shopSlice";
import { loginUser } from "../axios/axios-user"; // Asegúrate de importar la función adecuada

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.shop.userInfo);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Verifica si el usuario ya ha iniciado sesión, y si es así, muestra un mensaje
  useEffect(() => {
    if (userInfo) {
      setSuccessMsg("¡Iniciaste sesión con éxito!");
    }
  }, [userInfo]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrEmail("Ingresa tu email");
      return;
    }
    if (!password) {
      setErrPassword("Ingresa tu contraseña");
      return;
    }

    setLoading(true);

    try {
      const user = await loginUser(email, password);

      dispatch(
        setUserInfo({
          _id: user._id,
          userName: user.nombre,
          email: user.email,
          verified: user.verified,
        })
      );

      setLoading(false);
      setSuccessMsg("¡Iniciaste sesión con éxito!");

      // Verifica si el usuario ha validado su correo electrónico
      if (!user.verified) {
        // Si no ha validado el correo electrónico, redirige a la página de validación
        navigate("/validation");
      }
    } catch (error) {
      setLoading(false);

      if (error.response && error.response.data && error.response.data.msg) {
        alert(error.response.data.msg);
      } else {
        console.error("Error desconocido:", error);
      }
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-full pt-32">
      <div className="w-full pb-32">
        {!userInfo ? (
          // Muestra el formulario de inicio de sesión solo si el usuario no está logeado
          <form className="w-[350px] mx-auto flex flex-col items-center bg-orange-50 p-2 border border-orange-800 rounded-t-2xl">
            <div className="w-full border border-orange-900 p-6 rounded-t-2xl">
              <h2 className="font-titleFont text-3xl font-medium mb-4">
                Iniciar Sesión
              </h2>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">Email</p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full lowercase py-1 border border-gray-600 px-2 text-base rounded-sm outline-none"
                    type="email"
                  />
                  {errEmail && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>{" "}
                      {errEmail}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">Contraseña</p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full lowercase py-1 border border-gray-600 px-2 text-base rounded-sm outline-none"
                    type="password"
                  />
                  {errPassword && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>{" "}
                      {errPassword}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleLogin}
                  className="w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-orange-500 to-orange-300 hover:from-orange-600 hover:to-orange-400 border border-orange-900 active:border-yellow-800"
                >
                  Conectar
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
              </div>
            </div>
            <p className="w-full text-xs text-gray-600 mt-4 flex items-center">
              <span className="w-1/3 h-[1px] bg-orange-900  inline-flex"></span>
              <span className="w-1/3 text-center">¿No tienes cuenta?</span>
              <span className="w-1/3 h-[1px] bg-orange-900  inline-flex"></span>
            </p>
            <Link className="w-full" to="/registration">
              <button className="w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-orange-500 to-orange-300 hover:from-orange-600 hover:to-orange-400 border border-orange-900 active:border-yellow-800">
                Regístrate
              </button>
            </Link>
          </form>
        ) : (
          // Muestra el mensaje si el usuario ya ha iniciado sesión
          <div className="my-20 w-[350px] mx-auto flex flex-col items-center bg-green-50 p-2 border border-green-800 rounded-t-2xl">
            <p className="text-green-600 text-sm font-semibold mt-2 text-center">
              {successMsg}
            </p>
            <Link to="/" className="font-bold">
              Ir al inicio
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;