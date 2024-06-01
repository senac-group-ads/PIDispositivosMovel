import axios, { AxiosInstance } from 'axios'
import { AppErrors } from '../utils/appErrors';

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
    registerInterceptTokenManeger: (signOut: SignOut) => () => void
}

const api = axios.create({
    baseURL: 'http://54.242.40.77:3333' // Mudar ip conforme ip da maquina utilizada!!!!!!
}) as APIInstanceProps;

api.registerInterceptTokenManeger = signOut => {
    const InterceptTokenManeger = api.interceptors.response.use(response => response, requestError => {
        if(requestError?.response?.status === 401) {
            if(requestError.response.data.message === 'Unauthorized.' || requestError.response.data.message === 'invalid') {
                signOut()
            }
        }

        if(requestError.response && requestError.response.data) {
            return Promise.reject(new AppErrors(requestError.response.data.message))
        } else {
            return Promise.reject(requestError)
        }
    });

    return () => {
        api.interceptors.response.eject(InterceptTokenManeger);
    };
};


export { api };