import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

// Types
import {
    USUARIO_REGISTRO_EXITO,
    USUARIO_REGISTRO_ERROR,
    USUARIO_REGISTRO_RESET,
    USUARIO_LOGIN_EXITO,
    USUARIO_LOGIN_ERROR,
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} from '../types';

// Axios
import clienteAxios from '../../config/axios';
import TokenAuth from '../../config/tokenAuth';

const AuthState = ({ children }) => {

    // State inicial
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
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
            const respuesta = await clienteAxios.post('/users', datos);

            dispatch({
                type: USUARIO_REGISTRO_EXITO,
                payload: respuesta.data.msg
            });

        } catch (error) {
            dispatch({
                type: USUARIO_REGISTRO_ERROR,
                payload: {error: true, mensaje: error.response.data.msg ?
                                                error.response.data.msg :
                                                'Ocurrio un error, intenta nuevamente'}
            });
        }
    }

    // Autenticar usuarios
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/auth', datos);
            dispatch({
                type: USUARIO_LOGIN_EXITO,
                payload: respuesta.data.token
            });

        } catch (error) {
            dispatch({
                type: USUARIO_LOGIN_ERROR,
                payload: {error: true, mensaje: error.response.data.msg}
            });
        }
    }

    // Retornar el usuario autenticado en base al JWT
    const usuarioAutenticado = async () => {
    
        const token = localStorage.getItem('token');
    
        if(token) {
            TokenAuth(token);
        }
        
        try {
            const respuesta =  await clienteAxios.get('/auth');
            
            if(respuesta.data.user) {
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: respuesta.data.user
                });    
            }

            
        } catch (error) {
            dispatch({
                type: USUARIO_LOGIN_ERROR,
                payload: {error: true, mensaje: 'Tu sesion expiro, inicia sesion'}
            });
        }

    }

    // Cerrar la sesion
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
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
                // Propiedades
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                error: state.error,
                // Funciones
                registrarUsuario,
                resetErrorMessage,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
                
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;