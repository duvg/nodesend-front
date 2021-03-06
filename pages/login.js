import React, { useContext, useEffect} from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
// Context
import authContext from '../context/auth/authContext';
import useAlerta from "../hooks/useAlerta";

const Login = () => {

  const AuthContext = useContext(authContext);

  const {token, mensaje, error, autenticado, iniciarSesion, resetErrorMessage} = AuthContext;

  // Next router
  const router = useRouter();

  useEffect(() => {

    if(mensaje) {
      useAlerta(mensaje, error); // Alerta de la operación sea exitosa o erronea
      resetErrorMessage(); // Limpiar el mensaje y el error del state
    }

    if(autenticado) {
      router.push('/');
    }

    // Si no hay errores limpiar el formulario
    error === false ? resetForm() : null;


  }, [mensaje, autenticado]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El email ingresado no es valido')
        .required('El email es obligatorio'),
      password: Yup.string()
        .required('El password es obligatorio')
    }),
    onSubmit: data => {
        iniciarSesion(data);
    }
  });

  const resetForm = () => {
    formik.resetForm();
  }

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Iniciar Sesion</h2>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">

            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-6 my-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="email"
                >Email</label>
                <input
                  className="shadow:appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-20 "
                  type="email"
                  id="email"
                  placeholder="user@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.email && formik.errors.email ? (
                  <div className="bg-gray-200 my-2 p-4 border-l-4 border-red-500 text-red-700">
                    {formik.errors.email}
                  </div>
                ) : null}

              </div>

              <div className="mb-4">
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="password"
                >Password</label>
                <input
                  className="shadow:appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-20"
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ?
                  <div className="bg-gray-200 my-2 p-4 border-l-4 botder-red-600 text-red-700">
                    {formik.errors.password}
                  </div>
                  : null}
              </div>
              <input
                type="submit"
                className="bg-red-500 hover:bg-gray-900 w-full p-2 rounded text-white font-bold uppercase"
                value="iniciar sesion"
              />

            </form>

          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;