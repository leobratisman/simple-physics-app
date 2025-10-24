import axios from 'axios';

export const apiUrl = "https://simple-physics.ru/api";
// export const apiUrl = "http://localhost:8000/api";
export const S3_URL = "https://2bd46b48-5071-4796-b3dc-154f777c11c6.selstorage.ru/";
export const S3_ITEM_TYPE = ".webp";

axios.defaults.withCredentials = false;

// axios.interceptors.request.use(
//     function (config) {
//         const token = localStorage.getItem('token');
//         if (token) {
//             if (config && config.headers) {
//                 config.headers.Authorization = `Bearer ${token}`;
//             }
//         }
//         return config;
//     },
//     function (err) {
//         return Promise.reject(err);
//     }
// );

export default axios;
