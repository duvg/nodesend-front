import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

// Types
import {
    USUARIO_REGISTRO_INICIO,
    USUARIO_REGISTRO_EXITOSO,
    USUARIO_REGISTRO_ERROR,
    USUARIO_REGISTRO_RESET
} from '../types';

// Axios
import clienteAxios from '../../config/axios';

const AuthState = ({ children }) => {

    // State inicial
    const initialState = {
        token: '',
        autenticado: null,
        usuario: null,
        mensaje: null,
        error: false
    }

    // Reducer
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Retgistrar nuevos usuarios
    const registrarUsuario = async datos => {

        try {
            const respuesta = await clienteAxios.post('/api/v1/users', datos);

            dispatch({
                type: USUARIO_REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            });

        } catch (error) {
            dispatch({
                type: USUARIO_REGISTRO_ERROR,
                payload: {error: true, mensaje: error.response.data.msg}
            });
        }
    }

    // Usuario autenticado
    const usuarioAutenticado = nombre => {
        dispatch({
            type: USUARIO_AUTENTICADO_INICIO,
            payload: nombre
        });
    }

    // Restablecer el mensaje del sistema  el error
    const resetErrorMessage = () => {
        dispatch({
            type: USUARIO_REGISTRO_RESET
        });
    }

    return (
        <authContext.Provider
            value={{
                // Variables
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                error: state.error,
                // Funciones
                registrarUsuario,
                usuarioAutenticado,
                resetErrorMessage
                
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;