import {
    USUARIO_REGISTRO_INICIO,
    USUARIO_REGISTRO_EXITOSO,
    USUARIO_REGISTRO_ERROR,
    USUARIO_REGISTRO_RESET,
    
} from '../types';

export default function authReducer(state, action) {
    switch(action.type) {
        case USUARIO_REGISTRO_RESET:
        case USUARIO_REGISTRO_INICIO:
            return {
                ...state,
                mensaje: null,
                error: null
            }
        case USUARIO_REGISTRO_EXITOSO:
            return {
                ...state,
                mensaje: action.payload,
                error: false
            }
        case USUARIO_REGISTRO_ERROR:
            console.log(action.payload);
            return {
                ...state,
                mensaje: action.payload.mensaje,
                error: action.payload.error
            }
        default:
            return state;
    }
}