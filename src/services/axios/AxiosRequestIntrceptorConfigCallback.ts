import type {InternalAxiosRequestConfig} from 'axios';
import appConfig from "../../configs/app.config";
import {getHttpAuthToken} from '../../utils/authUtils';

const AxiosRequestIntrceptorConfigCallback = (
    config: InternalAxiosRequestConfig,
) => {
    config.headers = config.headers || {};

    const currentToken = getHttpAuthToken();
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
