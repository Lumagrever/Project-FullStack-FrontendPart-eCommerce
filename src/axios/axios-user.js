import axios from 'axios';
import { BASE_URL } from '../utils/constants';


export const createUser = async (nombre, email, password) => {
    try {
        console.log('Datos enviados al crear usuario:', {
            nombre,
            email,
            password,
        });
        await axios.post(`${BASE_URL}/auth/register`, {
            nombre,
            email,
            password,
        });
        const user = await loginUser(email, password);
        return user;
    } catch (error) {
        return alert(error.response.data.errors[0].msg);
    }
};

/*
export const createUser = async (nombre, email, password) => {
    try {
        await axios.post(`${BASE_URL}/auth/register`, {
            nombre,
            email,
            password,
        });
        // No inicies sesión automáticamente aquí
        return { uid: null, email }; // Devuelve un objeto con la información del usuario registrado
    } catch (error) {
        alert(error.response.data.errors[0].msg);
        throw error; // Lanza el error para que puedas manejarlo en el componente Registration.js
    }
};*/

export const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
  
      // Verifica si la respuesta contiene la información del usuario
      if (response.data && response.data.usuario) {
        return response.data.usuario; // Devuelve la información del usuario
      } else {
        console.error("Respuesta de inicio de sesión sin datos de usuario:", response);
        throw new Error("Error al iniciar sesión: Datos de usuario no encontrados");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error; // Lanza el error para que puedas manejarlo en el componente Login.js
    }
  };

  export const verifyUser = async (email, code) => {
    try {
        const response = await axios.patch(`${BASE_URL}/auth/verify`, {
            email,
            code,
        });
        console.log('Usuario verificado');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.msg || 'Código incorrecto');
    }
};