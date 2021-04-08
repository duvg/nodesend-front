import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import Dropzone from '../components/Dropzone';
import Link from 'next/link';
import useAlerta  from '../hooks/useAlerta';

// Context
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";

const Index = () => {

    // Extrear el usuario autenticado del Storage
    const AuthContext = useContext(authContext);
    const { usuarioAutenticado } = AuthContext;

    // Extraer el mensaje de error de archivos
    const AppContext = useContext(appContext);
    const { mensaje_archivo, url } = AppContext;

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            usuarioAutenticado();
        }

        /*
        if(mensaje_archivo) {
            useAlerta(mensaje_archivo);
        }*/
        
    }, []);

    return (
        <Layout>
            { mensaje_archivo ? useAlerta(mensaje_archivo, true) : null }
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                { url ? (
                    <>
                        <p className="text-center text-2xl mt-10">
                            <span className="font-bold text-red-700 text-4xl uppercase">Tu URL es:</span> {`${process.env.frontendURL}/enlaces/${url}`}
                        </p>
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-gray-900 w-full p-2 rounded text-white font-bold uppercase mt-5"
                            onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/enlaces/${url}`)}
                        >Copiar enlace</button>
                    </>
                 ) : (
                    <>
                        <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
                            <Dropzone />
                            <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Compartir Archivos de forma sencilla y privada</h2>    
                                <p className="text-lg leading-loose">
                                    <span className="text-red-500 font-bold">ReactNodeSend</span> Te permite compartir archivos con cifrado de extremo a extremo y un archivo que es eliminado después de 
                                    ser descargado. Así que puedes mantener lo que compates en privado y asegurarte de que tus cosas no
                                    permanezcan en linea para siempre.
                                </p>
                                <Link href="/crearcuenta">
                                    <a className="text-red-500 font-bold text-lg hover:text-red-700"> Crea una cuenta para mayores beneficios</a>
                                </Link>
                            </div>
                        </div>
                    </>
                 )}
            </div>
        </Layout>
    );
}
 
export default Index;