import React from 'react';
import Swal from 'sweetalert2';

const useAlerta = (msg, error) => {
    console.log(msg);
    console.log(error);
    console.log(error);
    const alert = Swal.fire({
        title: error ? 'Error!' : 'Exito',
        text: msg,
        icon:  error ? 'error' : 'success',
      });
}
 
export default useAlerta;