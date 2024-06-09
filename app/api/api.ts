import axios, {Axios} from 'axios';

const api: Axios = axios.create({
    baseURL: 'https://dummyjson.com'
});

export default api;
