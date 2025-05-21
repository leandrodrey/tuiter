import type { InternalAxiosRequestConfig } from 'axios'
import appConfig from "../../configs/app.config.ts";

const AxiosRequestIntrceptorConfigCallback = (
    config: InternalAxiosRequestConfig,
) => {
    // Add authentication token to headers if available
    if (appConfig.authToken) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${appConfig.authToken}`;
    }

    return config;
}

export default AxiosRequestIntrceptorConfigCallback
