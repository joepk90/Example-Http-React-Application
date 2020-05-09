import axios from 'axios';
import { toast } from 'react-toastify';

axios.interceptors.response.use(null, error => {

    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

    // unexpected errors (erros that shouldn't occur: network down, server down, database down, bug)
    // - Log them
    // - display a generic and freindly error message

    if (!expectedError) {
        console.log('logging the error', error);
        toast.error('unexpected error occured');
    }

    return Promise.reject(error);

});

export default {

    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,

}