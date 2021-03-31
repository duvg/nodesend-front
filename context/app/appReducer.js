import {
    SUBIR_ARCHIVO_INICIO,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR,
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../types';

export default function appReducer(state, action) {
    switch(action.type) {
        case MOSTRAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: action.payload
            }
        case OCULTAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: null
            }
        case SUBIR_ARCHIVO_INICIO:
            return {
                ...state,
                cargando: true
            }
        case SUBIR_ARCHIVO_EXITO:
            return {
                ...state,
                nombre: action.payload.nombre,
                nombre_original: action.payload.nombre_original,
                cargando: false
            }
        case SUBIR_ARCHIVO_ERROR:
            return {
                ...state,
                mensaje_archivo: action.payload,
                cargando: false
            }
        case CREAR_ENLACE_EXITO:
            return{
                ...state,
                url: action.payload
            }

        default:
            return state;
    }
}