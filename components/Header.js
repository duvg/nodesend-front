import React, {useContext, useEffect} from 'react';
import Link from 'next/link';
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";
import { useRouter } from 'next/router';

const Header = () => {
    // Routing
    const router = useRouter();

    // Context para autenticacion
    const AuthContext = useContext(authContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = AuthContext;

    // Context de la aplicacion
    const AppContext = useContext(appContext);
    const { limpiarState, crearEnlace } = AppContext;
    

    useEffect(() => {
        usuarioAutenticado();
    }, []);

    const redireccionar = () => {
        router.push('/');
        limpiarState();
    }

    return ( 
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            
            <img
                onClick={() => redireccionar()} 
                className="w-64 mb-8 md:mb-0 cursor-pointer" src="/logo.svg" alt="React Node Send"
            />
            
            
            
            <div>
                {
                    usuario ? (
                        <>
                            <p className=" text-center md:inline-block" >Hola {usuario.nombre}</p>
                            <button
                                type="button"
                                className=" hover:bg-black hover:text-white px-3 py-2 ml-2 border-2 border-gray-500 rounded-lg text-gray-600 font-bold uppercase"
                                onClick={() => cerrarSesion()}
                            >
                                Cerrar Sesion
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <a className="bg-red-500 hover:bg-red-600 px-3 py-2 border-2 border-red-500 rounded-lg text-white font-bold uppercase">Iniciar Sesion</a>
                            </Link>
                            <Link href="/crearcuenta">
                                <a className=" hover:bg-black hover:text-white px-3 py-2 ml-2 border-2 border-gray-500 rounded-lg text-gray-600 font-bold uppercase">Crear Cuenta</a>
                            </Link>
                        </>
                    )

                }

            </div>
        </header>
    );
}
 
export default Header;