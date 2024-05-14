import axios from 'axios'
import { AppErrors } from '../utils/appErrors';

const api = axios.create({
    baseURL: 'http://192.168.254.100:3333' // Mudar ip conforme ip da maquina utilizada!!!!!!
})

api.interceptors.response.use(response => response, err => {
    if(err.response && err.response.data) {
        return Promise.reject(new AppErrors(err.response.data.message))
    } else {
        return Promise.reject(err)
    }
})

export { api };