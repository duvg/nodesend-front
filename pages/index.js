import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';

// Context
import authContext from "../context/auth/authContext";

const Index = () => {

    const AuthContext = useContext(authContext);
    const { usuarioAutenticado } = AuthContext;

    useEffect(() => {
        usuarioAutenticado();
    }, []);

    return (
        <Layout>
            <h1>Index</h1>
        </Layout>
    );
}
 
export default Index;