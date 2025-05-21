// AxiosRequestIntrceptorConfigCallback.ts
import type { InternalAxiosRequestConfig } from 'axios';
import appConfig from "../../configs/app.config";
// IMPORTA LA FUNCIÓN PARA OBTENER EL TOKEN GLOBAL
import { getHttpAuthToken } from '../../utils/authUtils'; // Ajusta la ruta

const AxiosRequestIntrceptorConfigCallback = (
    config: InternalAxiosRequestConfig,
) => {
    config.headers = config.headers || {};

    // Only add Authorization header if token exists and is not null
    const currentToken = getHttpAuthToken(); // <-- OBTÉN EL TOKEN DE FORMA GLOBAL
    if (currentToken !== null && currentToken !== undefined) {
        config.headers['Authorization'] = currentToken;
    }

    // Always add Application-Token header
    if (appConfig.authToken) {
        config.headers['Application-Token'] = appConfig.authToken;
    }

    return config;
};

export default AxiosRequestIntrceptorConfigCallback;
