import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.0.113:1337/api/',
})

export default api