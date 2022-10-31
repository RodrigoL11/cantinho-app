import axios from 'axios';

//assistencia: 10.0.0.113
//casa: 192.168.2.7

const ip = '192.168.2.5'

const api = axios.create({
    baseURL: `http://${ip}:1337/api/`
})

export default api