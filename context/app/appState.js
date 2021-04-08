import React, { useReducer } from 'react';
import appContext from './appContext';
import appReducer from './appReducer';

import {
    SUBIR_ARCHIVO_INICIO,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR,
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA,
    LIMPIAR_STATE,
    AGREGAR_PASSWORD,
    AGREGAR_DESCARGAS
} from '../types';

import clienteAxios from '../../config/axios';

const AppState = ({ children }) => {

    const initialState = {
        mensaje_archivo: null,
        nombre: '',
        nombre_original: '',
        cargando: false,
        descargas: 1,
        password: '',
        autor: null,
        url: ''
    }

    // crear state y dispatch
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Mostrar alerta por el amaño de archivo
    const mostrarAlerta = msg => {

        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        });

        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            });
        }, 3000);
    }

    // Subir archivos al servidor
    const subirArchivo = async (formData, nombreArchivo) => {

        dispatch({
            type: SUBIR_ARCHIVO_INICIO,
        });

        try {
            const respuesta = await clienteAxios.post('/files', formData);

            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: respuesta.data.file,
                    nombre_original: nombreArchivo
                }
            });
        } catch (error) {
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            });
        }
    }

    // Crear el enlace cuando se subió el archivo
    const crearEnlace = async () => {
        const data = {
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor
        }

        try {
            const resultado = await clienteAxios.post('/links', data);
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: resultado.data.msg
            });
        } catch (error) {
            dispatch({
                type: CREAR_ENLACE_ERROR,
                payload: error.response.data.msg
            });
        }
    }

    const limpiarState = () => {
        dispatch({
            type: LIMPIAR_STATE
        });
    }

    // Agregar password al archivo
    const agregarPassword = password => {
        dispatch({
            type: AGREGAR_PASSWORD,
            payload: password
        });
    }

    // Agregar la cantidad de descargas
    const agregarDescargas = descargas => {
        dispatch({
            type: AGREGAR_DESCARGAS,
            payload: descargas
        });
    }

    return (
        <appContext.Provider
            value={{
                // Propiedades
                mensaje_archivo: state.mensaje_archivo,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                cargando: state.cargando,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url,
                //Funciones
                mostrarAlerta,
                subirArchivo,
                crearEnlace,
                limpiarState,
                agregarPassword,
                agregarDescargas
            }}
        >
            {children}
        </appContext.Provider>
    )
}


export default AppState;