import Layout from '../../components/Layout';
import clienteAxios from '../../config/axios';

export async function getServerSideProps({params}) {
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

    console.log(enlaces.data);

    return {
        paths: enlaces.data.links.map(enlace => ( {
            params: { enlace: enlace.url }
        })),
        fallback: false
    }
}

const enlaces = ({enlace}) => {
    console.log(enlace);
    return(
        <Layout>
            <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo</h1>
            <div className="flex text-center justify-center mt-10">
                <a 
                    href={`${process.env.backendURL}/files/${enlace.file}`} 
                    className="bg-red-500 text-center rounded px-10 py-3 text-white font-bold uppercase cursor-pointer"
                    download   
                >Aqui</a>
            </div>
        </Layout>
    )
}

export default enlaces;