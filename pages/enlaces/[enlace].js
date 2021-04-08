import React, { useState } from 'react';
import Layout from '../../components/Layout';
import clienteAxios from '../../config/axios';
import useAlerta, {} from '../../hooks/useAlerta';

export async function getServerSideProps({ params }) {
    const { enlace } = params;

    const resultado = await clienteAxios.get(`/links/${enlace}`);

    return {
        props: {
            enlace: resultado.data
        }
    }
}

export async function getServerSidePaths() {
    const enlaces = await clienteAxios.get('/links');


    return {
        paths: enlaces.data.links.map(enlace => ({
            params: { enlace: enlace.url }
        })),
        fallback: false
    }
}

const enlaces = ({ enlace }) => {

    const [tienePassword, setTienePassword] = useState(enlace.password);
    const [password, setPassword] = useState('');


    const verificarPassword = async e => {
        e.preventDefault();

        const data = {
            password
        };

        try {
            const resultado = await clienteAxios.post(`/links/${enlace.link}`, data);
            setTienePassword(resultado.data.password);


            
        } catch (error) {
            useAlerta(error.response.data.msg, true);
        }
    }

    return (
        <Layout>
            {
                tienePassword ? (
                    <>

                        <p className="text-center">Este enlace esta protegido con un password, ingresalo a continuación:</p>
                        <div className="flex justify-center mt-5">
                            <div className="w-full max-w-lg">
                                <form
                                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={e => verificarPassword(e)}
                                >
                                    <div className="mb-4">
                                        <label
                                            className="block text-black text-sm font-bold mb-2"
                                            htmlFor="password"
                                        >Password:</label>
                                        <input
                                            type="password"
                                            className="shadow:appereance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                        <input
                                            type="submit"
                                            className="bg-red-500 hover:bg-gray-900 w-full p-2 rounded text-white font-bold uppercase"
                                            value="Validar Password"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                ) :
                    (
                        <>
                            <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo</h1>
                            <div className="flex text-center justify-center mt-10">
                                <a
                                    href={`${process.env.backendURL}/files/${enlace.file}`}
                                    className="bg-red-500 text-center rounded px-10 py-3 text-white font-bold uppercase cursor-pointer"
                                    download
                                >Aqui</a>
                            </div>
                        </>
                    )
            }

        </Layout>
    )
}

export default enlaces;