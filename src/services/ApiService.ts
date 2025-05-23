import AxiosBase from './axios/AxiosBase'
import type {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios'

/**
 * Service for handling API requests using Axios.
 * Provides a standardized way to make HTTP requests to the backend.
 */
const ApiService = {
    /**
     * Makes an HTTP request using Axios and returns a promise with the response data.
     * @template Response - The expected response data type
     * @template Request - The request data type
     * @param {AxiosRequestConfig<Request>} param - The Axios request configuration
     * @returns {Promise<Response>} A promise that resolves with the response data or rejects with an error
     */
    fetchDataWithAxios<Response = unknown, Request = Record<string, unknown>>(
        param: AxiosRequestConfig<Request>,
    ) {
        return new Promise<Response>((resolve, reject) => {
            AxiosBase(param)
                .then((response: AxiosResponse<Response>) => {
                    resolve(response.data)
                })
                .catch((errors: AxiosError) => {
                    reject(errors)
                })
        })
    },
}

export default ApiService
