import axios from 'axios';

//assistencia: 10.0.0.113
//casa: 192.168.2.7

const api = axios.create({
    baseURL: 'http://192.168.2.7:1337/api/',
})

export default api