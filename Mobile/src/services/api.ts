import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://192.168.254.100:3333' // Mudar ip conforme ip da maquina utilizada!!!!!!
})