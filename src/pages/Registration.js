/*import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { motion } from "framer-motion";
import { RotatingLines } from "react-loader-spinner";

const Registration = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  // Manejo de errores y mensajes
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errCPassword, setErrCPassword] = useState("");
  const [firebaseErr, setFirebaseErr] = useState("");

  // Loading
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Validacion de Email

  const emailValidation = (email) => {
    return String(email)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  // Funciones Handle
  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleCPassword = (e) => {
    setCPassword(e.target.value);
    setErrCPassword("");
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("Ingresa tu nombre");
    }
    if (!email) {
      setErrEmail("Ingresa tu email");
      setFirebaseErr("");
    } else {
      if (!emailValidation(email)) {
        setErrEmail("Ingresa un email válido");
      }
    }
    if (!password) {
      setErrPassword("ingresa tu contraseña");
    } else {
      if (password.length < 6) {
        setErrPassword("la constraseña debe tener al menos 6 carácteres");
      }
    }
    if (!cPassword) {
      setErrCPassword("Confirma tu contraseña");
    } else {
      if (cPassword !== password) {
        setErrCPassword("Las contraseñas no conciden");
      }
    }
    if (
      clientName &&
      email &&
      emailValidation(email) &&
      password &&
      password.length >= 6 &&
      cPassword &&
      cPassword === password
    ) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: clientName,
            photoURL:
              "https://res.cloudinary.com/dvvzlx2na/image/upload/v1687837940/World%20of%20Warcraft%20-%20Items/Productos/Tiempo-de-juego/Picture-Profile.webp",
          });
          // Signed in
          const user = userCredential.user;
          setLoading(false);
          setSuccessMsg("Te registraste con exito!");
          setTimeout(() => {
            navigate("/Login");
          }, 3000);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            setFirebaseErr("El correo ya esta en uso. Proba con otro");
          }

          // ..
        });
      // =========== Registro de Firebase ===============
      setClientName("");
      setEmail("");
      setPassword("");
      setCPassword("");
      setErrCPassword("");
      setFirebaseErr("");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full pt-20 pb-20">
        <form className="w-[370px] mx-auto flex flex-col items-center g-orange-50 p-2 border border-orange-800 rounded-t-2xl bg-orange-50">
          <div className="w-full border border-orange-900 p-6 rounded-t-2xl">
            <h2 className="font-titleFont text-3xl font-medium mb-4">
              Zona de Registro
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Nombre</p>
                <input
                  onChange={handleName}
                  value={clientName}
                  className="w-full py-1 border border-gray-600 px-2 text-base rounded-sm outline-none"
                  type="text"
                />
                {errClientName && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>{" "}
                    {errClientName}
                  </p>
                )}
              </div>
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
                {firebaseErr && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>{" "}
                    {firebaseErr}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Contraseña</p>
                <input
                  onChange={handlePassword}
                  value={password}
                  className="w-full py-1 border border-gray-600 px-2 text-base rounded-sm outline-none"
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
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Confirmar contraseña</p>
                <input
                  onChange={handleCPassword}
                  value={cPassword}
                  className="w-full py-1 border border-gray-600 px-2 text-base rounded-sm outline-none"
                  type="password"
                />
                {errCPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>{" "}
                    {errCPassword}
                  </p>
                )}
                <p className="text-xs text-gray-600">Minimo 6 caracteres</p>
              </div>
              <button
                onClick={handleRegistration}
                className="w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-orange-500 to-orange-300 hover:from-orange-600 hover:to-orange-400 border border-orange-900 active:border-yellow-800"
              >
                Continuar
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
                <div>
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-base font-titleFont font-semibold text-green-500 border-[1px] border-green-500 px-2 text-center"
                  >
                    {successMsg}
                  </motion.p>
                </div>
              )}
            </div>
            <div>
              <p className="text-xs text-black leading-4 mt-4">
                Tenes una cuenta?{" "}
                <Link to="/login">
                  <span className="text text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100 ">
                    Inicia sesión
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;

*/


// CODIGO CORRECTO Y ESTABLE

/*
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { motion } from "framer-motion";
import { setUserInfo } from "../redux/shopSlice";
import { createUser } from "../axios/axios-user";

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errCPassword, setErrCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [userEmailErr, setUserEmailErr] = useState("");
  const [dbapiErr, setDBAPIErr] = useState("");

  const handleNameChange = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
    setUserEmailErr("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleCPasswordChange = (e) => {
    setCPassword(e.target.value);
    setErrCPassword("");
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    // Validación del nombre (debe tener al menos 5 caracteres)
    if (!clientName || clientName.length < 5) {
      setErrClientName("El nombre debe tener al menos 5 caracteres");
    } else {
      setErrClientName("");
    }

    // Validación del correo electrónico
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email || !email.match(emailPattern)) {
      setErrEmail("Ingresa un correo electrónico válido");
      setDBAPIErr("");
    } else {
      setErrEmail("");
      setDBAPIErr("");
    }

    // Validación de la contraseña (debe tener al menos 6 caracteres)
    if (!password || password.length < 6) {
      setErrPassword("La contraseña debe tener al menos 6 caracteres");
    } else {
      setErrPassword("");
    }

    // Validación de la confirmación de contraseña
    if (!cPassword || cPassword !== password) {
      setErrCPassword("Las contraseñas no coinciden");
    } else {
      setErrCPassword("");
    }

    // Verificar si hay errores de validación antes de continuar
    if (
      clientName &&
      clientName.length >= 5 &&
      email &&
      email.match(emailPattern) &&
      password &&
      password.length >= 6 &&
      cPassword &&
      cPassword === password
    ) {
      setLoading(true);

      try {
        await createUser(clientName, email, password);


        setLoading(false);
        setSuccessMsg("Te registraste con éxito!");
        setTimeout(() => {
          navigate("/login"); // Redirige a la página de inicio de sesión después del registro exitoso
        }, 3000);
      } catch (error) {
        setLoading(false);

        if (error.code === "auth/email-already-in-use") {
          setDBAPIErr("El correo ya está en uso. Prueba con otro");
        } else {
          console.error("Error desconocido:", error);
        }
      }

      // Restablecer los campos después del registro
      setClientName("");
      setEmail("");
      setPassword("");
      setCPassword("");
      setErrCPassword("");
      setDBAPIErr("");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full pt-20 pb-20">
        <form className="w-[370px] mx-auto flex flex-col items-center g-orange-50 p-2 border border-orange-800 rounded-t-2xl bg-orange-50">
          <div className="w-full border border-orange-900 p-6 rounded-t-2xl">
            <h2 className="font-titleFont text-3xl font-medium mb-4">
              Zona de Registro
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Nombre</p>
                <input
                  onChange={handleNameChange}
                  value={clientName}
                  className="w-full py-1 border border-gray-600 px-2 text-base rounded-sm outline-none"
                  type="text"
                />
                {errClientName && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>{" "}
                    {errClientName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Email</p>
                <input
                  onChange={handleEmailChange}
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
                {dbapiErr && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>{" "}
                    {dbapiErr}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Contraseña</p>
                <input
                  onChange={handlePasswordChange}
                  value={password}
                  className="w-full py-1 border border-gray-600 px-2 text-base rounded-sm outline-none"
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
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Confirmar contraseña</p>
                <input
                  onChange={handleCPasswordChange}
                  value={cPassword}
                  className="w-full py-1 border border-gray-600 px-2 text-base rounded-sm outline-none"
                  type="password"
                />
                {errCPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>{" "}
                    {errCPassword}
                  </p>
                )}
                <p className="text-xs text-gray-600">Mínimo 6 caracteres</p>
              </div>
              <button
                onClick={handleRegistration}
                className="w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-orange-500 to-orange-300 hover:from-orange-600 hover:to-orange-400 border border-orange-900 active:border-yellow-800"
              >
                Continuar
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
                <div>
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-base font-titleFont font-semibold text-green-500 border-[1px] border-green-500 px-2 text-center"
                  >
                    {successMsg}
                  </motion.p>
                </div>
              )}
            </div>
            <div>
              <p className="text-xs text-black leading-4 mt-4">
                ¿Tienes una cuenta?{" "}
                <Link to="/login">
                  <span className="text text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100 ">
                    Inicia sesión
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
*/

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { verifyUser, createUser } from "../axios/axios-user";

const Registration = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.shop.userInfo);
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errCPassword, setErrCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [userEmailErr, setUserEmailErr] = useState("");
  const [dbapiErr, setDBAPIErr] = useState("");

  const handleNameChange = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
    setUserEmailErr("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleCPasswordChange = (e) => {
    setCPassword(e.target.value);
    setErrCPassword("");
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
  
    // Validación del nombre (debe tener al menos 5 caracteres)
    if (!clientName || clientName.length < 5) {
      setErrClientName("El nombre debe tener al menos 5 caracteres");
    } else {
      setErrClientName("");
    }
  
    // Validación del correo electrónico
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email || !email.match(emailPattern)) {
      setErrEmail("Ingresa un correo electrónico válido");
      setDBAPIErr("");
    } else {
      setErrEmail("");
      setDBAPIErr("");
    }
  
    // Validación de la contraseña (debe tener al menos 6 caracteres)
    if (!password || password.length < 6) {
      setErrPassword("La contraseña debe tener al menos 6 caracteres");
    } else {
      setErrPassword("");
    }
  
    // Validación de la confirmación de contraseña
    if (!cPassword || cPassword !== password) {
      setErrCPassword("Las contraseñas no coinciden");
    } else {
      setErrCPassword("");
    }
  
    // Verificar si hay errores de validación antes de continuar
    if (
      clientName &&
      clientName.length >= 5 &&
      email &&
      email.match(emailPattern) &&
      password &&
      password.length >= 6 &&
      cPassword &&
      cPassword === password
    ) {
      setLoading(true);
  
      try {
          await createUser(clientName, email, password);
  
        setLoading(false);
        setSuccessMsg("Te registraste con éxito!");
        setTimeout(() => {
          // Redirige al usuario a la página de inicio de sesión después del registro
          navigate("/login");
        }, 3000);
      } catch (error) {
        setLoading(false);
  
        if (error.code === "auth/email-already-in-use") {
          setDBAPIErr("El correo ya está en uso. Prueba con otro");
        } else {
          console.error("Error desconocido:", error);
        }
      }
  
      // Restablecer los campos después del registro
      setClientName("");
      setEmail("");
      setPassword("");
      setCPassword("");
      setErrCPassword("");
      setDBAPIErr("");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full pt-20 pb-20">
        <form className="w-[370px] mx-auto flex flex-col items-center g-orange-50 p-2 border border-orange-800 rounded-t-2xl bg-orange-50">
          <div className="w-full border border-orange-900 p-6 rounded-t-2xl">
            <h2 className="font-titleFont text-3xl font-medium mb-4">
              Zona de Registro
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Nombre</p>
                <input
                  onChange={handleNameChange}
                  value={clientName}
                  className="w-full py-1 border border-gray-600 px-2 text-base rounded-sm outline-none"
                  type="text"
                />
                {errClientName && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>{" "}
                    {errClientName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Email</p>
                <input
                  onChange={handleEmailChange}
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
                {dbapiErr && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>{" "}
                    {dbapiErr}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Contraseña</p>
                <input
                  onChange={handlePasswordChange}
                  value={password}
                  className="w-full py-1 border border-gray-600 px-2 text-base rounded-sm outline-none"
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
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Confirmar contraseña</p>
                <input
                  onChange={handleCPasswordChange}
                  value={cPassword}
                  className="w-full py-1 border border-gray-600 px-2 text-base rounded-sm outline-none"
                  type="password"
                />
                {errCPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>{" "}
                    {errCPassword}
                  </p>
                )}
                <p className="text-xs text-gray-600">Mínimo 6 caracteres</p>
              </div>
              <button
                onClick={handleRegistration}
                className="w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-orange-500 to-orange-300 hover:from-orange-600 hover:to-orange-400 border border-orange-900 active:border-yellow-800"
              >
                Continuar
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
                <div>
                  <p
                    className="text-base font-titleFont font-semibold text-green-500 border-[1px] border-green-500 px-2 text-center"
                  >
                    {successMsg}
                  </p>
                </div>
              )}
            </div>
            <div>
              <p className="text-xs text-black leading-4 mt-4">
                ¿Tienes una cuenta?{" "}
                <Link to="/login">
                  <span className="text text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100 ">
                    Inicia sesión
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
