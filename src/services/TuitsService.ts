import ApiService from './ApiService';
import type {TuitData, TuitResponse, SuccessResponse} from '../types/apiTypes';

/**
 * Calls the API endpoint to create a new tuit.
 * @param data The payload containing tuit data (message).
 * @returns A promise that resolves with the tuit creation response from the API.
 */
export async function apiCreateTuit(data: TuitData) {
    return ApiService.fetchDataWithAxios<TuitResponse>({
        url: '/me/tuits',
        method: 'post',
        data,
        params: {}
    });
}

/**
 * Calls the API endpoint to get a specific tuit.
 * @param tuitId The ID of the tuit to retrieve.
 * @returns A promise that resolves with the tuit response from the API.
 */
export async function apiGetTuit(tuitId: number) {
    return ApiService.fetchDataWithAxios<TuitResponse>({
        url: `/me/tuits/${tuitId}`,
        method: 'get',
        params: {}
    });
}

/**
 * Calls the API endpoint to add a like to a tuit.
 * @param tuitId The ID of the tuit to like.
 * @returns A promise that resolves with the like addition response from the API.
 */
export async function apiAddLikeToTuit(tuitId: number) {
    return ApiService.fetchDataWithAxios<SuccessResponse>({
        url: `/me/tuits/${tuitId}/likes`,
        method: 'post',
        params: {}
    });
}

/**
 * Calls the API endpoint to remove a like from a tuit.
 * @param tuitId The ID of the tuit to unlike.
 * @returns A promise that resolves with the like removal response from the API.
 */
export async function apiRemoveLikeFromTuit(tuitId: number) {
    return ApiService.fetchDataWithAxios<SuccessResponse>({
        url: `/me/tuits/${tuitId}/likes`,
        method: 'delete',
        params: {}
    });
}

/**
 * Calls the API endpoint to get replies to a tuit.
 * @param tuitId The ID of the tuit to get replies for.
 * @returns A promise that resolves with the tuit replies response from the API.
 */
export async function apiGetTuitReplies(tuitId: number) {
    return ApiService.fetchDataWithAxios<TuitResponse[]>({
        url: `/me/tuits/${tuitId}/replies`,
        method: 'get',
        params: {}
    });
}

/**
 * Calls the API endpoint to add a reply to a tuit.
 * @param tuitId The ID of the tuit to reply to.
 * @param data The payload containing reply data (message).
 * @returns A promise that resolves with the reply creation response from the API.
 */
export async function apiAddReplyToTuit(tuitId: number, data: TuitData) {
    return ApiService.fetchDataWithAxios<TuitResponse>({
        url: `/me/tuits/${tuitId}/replies`,
        method: 'post',
        data,
        params: {}
    });
}
