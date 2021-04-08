import React from 'react';
import Head from 'next/head';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>React Node Send</title>
                <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
                <style global>{`
                    html {
                        background: rgba(243,244,246)
                    }
                `}

                </style>
            </Head>

            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto">
                    <Header />
                    <main className="mt-10">
                        {children}
                    </main>
                </div>
            </div>
            
        </>
    );
}
 
export default Layout;