import axios from 'axios';

const ip = [
    '192.168.2.7', // casa
    '10.0.0.124',   // assistencia
    '192.168.206.28' //fafibe    
]

const api = axios.create({
    baseURL: `https://7eb6-2001-12b4-625-9d00-dc7d-d44b-4218-d8fc.sa.ngrok.io/api/`
})

export default api