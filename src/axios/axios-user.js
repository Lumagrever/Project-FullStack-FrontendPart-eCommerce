import axios from 'axios';
import { BASE_URL } from '../utils/constants';

export const createUser = async (nombre, email, password) => {
    try {
        await axios.post(`${BASE_URL}/auth/register`, {
            nombre,
            email,
            password,
        });
        return { uid: null, email };
    } catch (error) {
        alert(error.response.data.errors[0].msg);
        throw error;
    }
};

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
        throw new Error("Error al iniciar sesión: Datos de usuario no encontrados");
      }
    } catch (error) {
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