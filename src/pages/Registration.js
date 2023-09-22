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
  
    // Remover espacios múltiples y luego validar el nombre (debe tener al menos 5 caracteres, solo letras y espacios)
    const namePattern = /^[A-Za-z]+( [A-Za-z]+)*$/;
    const cleanedName = clientName.replace(/\s+/g, ' ').trim(); // Remueve espacios múltiples y trim para quitar espacios al principio y al final
  
    if (!cleanedName || cleanedName.length < 5 || !namePattern.test(cleanedName)) {
      setErrClientName("El nombre debe tener al menos 5 caracteres y contener solo letras");
      return;
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
  
      // Restablece los campos después del registro
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