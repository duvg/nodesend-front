import React, {useContext, useEffect} from 'react';
import Link from 'next/link';
import authContext from "../context/auth/authContext";

const Header = () => {
    const AuthContext = useContext(authContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = AuthContext;

    useEffect(() => {
        usuarioAutenticado();
    }, []);

    return ( 
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <Link href="/">
                <img className="w-64 mb-8 md:mb-0" src="logo.svg" alt="React Node Send" />
            </Link>
            
            
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