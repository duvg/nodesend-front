import {
    USUARIO_REGISTRO_EXITO,
    USUARIO_REGISTRO_ERROR,
    USUARIO_REGISTRO_RESET,
    USUARIO_LOGIN_EXITO,
    USUARIO_LOGIN_ERROR,
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} from '../types';

export default function authReducer(state, action) {
    switch(action.type) {
        case USUARIO_REGISTRO_EXITO:
            return {
                ...state,
                mensaje: action.payload,
                error: false
            }
        case USUARIO_LOGIN_ERROR:
        case USUARIO_REGISTRO_ERROR:
            return {
                ...state,
                mensaje: action.payload.mensaje,
                error: action.payload.error
            }
        case USUARIO_REGISTRO_RESET:
            return {
                ...state,
                mensaje: null,
                error: null
            }
        case USUARIO_LOGIN_EXITO:
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                token: action.payload,
                autenticado: true,
                error: false,
                mensaje: null
            }
        case USUARIO_AUTENTICADO:
            return {
                ...state,
                usuario: action.payload
            }
        case CERRAR_SESION:
            localStorage.removeItem('token');
            return {
                ...state,
                usuario: null,
                token: '',
                autenticado: null
            }
        default:
            return state;
    }
}