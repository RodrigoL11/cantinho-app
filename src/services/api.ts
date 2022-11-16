import axios from 'axios';

const ip = [
    '192.168.2.7', // casa
    '10.0.0.124'   // assistencia
]

const api = axios.create({
    baseURL: `http://${ip[0]}:1337/api/`
})

export default api