import axios from 'axios';

const ip = [
    '192.168.2.7', // casa
    '10.0.0.124',   // assistencia
    'https://3b18-45-172-144-32.sa.ngrok.io/'
]

const api = axios.create({
    baseURL: `https://3b18-45-172-144-32.sa.ngrok.io/api/`
})

export default api