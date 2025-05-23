import ApiService from './ApiService';
import type {TuitResponse, FeedParams} from '../types/apiTypes';

/**
 * Calls the API endpoint to get the user's feed.
 * @param params Optional parameters for pagination and filtering (page, only_parents).
 * @returns A promise that resolves with the feed response from the API.
 */
export async function apiGetFeed(params?: FeedParams) {
    return ApiService.fetchDataWithAxios<TuitResponse[]>({
        url: '/me/feed',
        method: 'get',
        params
    });
}
