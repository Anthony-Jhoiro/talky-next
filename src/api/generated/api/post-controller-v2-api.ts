/* tslint:disable */
/* eslint-disable */
/**
 * Post API
 * Documentation of Post API
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { PagePostDto } from '../models';
/**
 * PostControllerV2Api - axios parameter creator
 * @export
 */
export const PostControllerV2ApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * List public posts with pagination
         * @param {string} searchStart 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listPosts: async (searchStart: string, page?: number, size?: number, sort?: Array<string>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'searchStart' is not null or undefined
            assertParamExists('listPosts', 'searchStart', searchStart)
            const localVarPath = `/api/v2/posts`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (size !== undefined) {
                localVarQueryParameter['size'] = size;
            }

            if (sort) {
                localVarQueryParameter['sort'] = sort;
            }

            if (searchStart !== undefined) {
                localVarQueryParameter['searchStart'] = (searchStart as any instanceof Date) ?
                    (searchStart as any).toISOString() :
                    searchStart;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * List posts from a user with pagination
         * @param {string} authorId UUID of the posts author
         * @param {string} searchStart 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listUserPosts: async (authorId: string, searchStart: string, page?: number, size?: number, sort?: Array<string>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorId' is not null or undefined
            assertParamExists('listUserPosts', 'authorId', authorId)
            // verify required parameter 'searchStart' is not null or undefined
            assertParamExists('listUserPosts', 'searchStart', searchStart)
            const localVarPath = `/api/v2/posts/author/{authorId}`
                .replace(`{${"authorId"}}`, encodeURIComponent(String(authorId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (size !== undefined) {
                localVarQueryParameter['size'] = size;
            }

            if (sort) {
                localVarQueryParameter['sort'] = sort;
            }

            if (searchStart !== undefined) {
                localVarQueryParameter['searchStart'] = (searchStart as any instanceof Date) ?
                    (searchStart as any).toISOString() :
                    searchStart;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PostControllerV2Api - functional programming interface
 * @export
 */
export const PostControllerV2ApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = PostControllerV2ApiAxiosParamCreator(configuration)
    return {
        /**
         * List public posts with pagination
         * @param {string} searchStart 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listPosts(searchStart: string, page?: number, size?: number, sort?: Array<string>, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PagePostDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listPosts(searchStart, page, size, sort, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * List posts from a user with pagination
         * @param {string} authorId UUID of the posts author
         * @param {string} searchStart 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listUserPosts(authorId: string, searchStart: string, page?: number, size?: number, sort?: Array<string>, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PagePostDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listUserPosts(authorId, searchStart, page, size, sort, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * PostControllerV2Api - factory interface
 * @export
 */
export const PostControllerV2ApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = PostControllerV2ApiFp(configuration)
    return {
        /**
         * List public posts with pagination
         * @param {string} searchStart 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listPosts(searchStart: string, page?: number, size?: number, sort?: Array<string>, options?: any): AxiosPromise<PagePostDto> {
            return localVarFp.listPosts(searchStart, page, size, sort, options).then((request) => request(axios, basePath));
        },
        /**
         * List posts from a user with pagination
         * @param {string} authorId UUID of the posts author
         * @param {string} searchStart 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listUserPosts(authorId: string, searchStart: string, page?: number, size?: number, sort?: Array<string>, options?: any): AxiosPromise<PagePostDto> {
            return localVarFp.listUserPosts(authorId, searchStart, page, size, sort, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PostControllerV2Api - object-oriented interface
 * @export
 * @class PostControllerV2Api
 * @extends {BaseAPI}
 */
export class PostControllerV2Api extends BaseAPI {
    /**
     * List public posts with pagination
     * @param {string} searchStart 
     * @param {number} [page] Zero-based page index (0..N)
     * @param {number} [size] The size of the page to be returned
     * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PostControllerV2Api
     */
    public listPosts(searchStart: string, page?: number, size?: number, sort?: Array<string>, options?: AxiosRequestConfig) {
        return PostControllerV2ApiFp(this.configuration).listPosts(searchStart, page, size, sort, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * List posts from a user with pagination
     * @param {string} authorId UUID of the posts author
     * @param {string} searchStart 
     * @param {number} [page] Zero-based page index (0..N)
     * @param {number} [size] The size of the page to be returned
     * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PostControllerV2Api
     */
    public listUserPosts(authorId: string, searchStart: string, page?: number, size?: number, sort?: Array<string>, options?: AxiosRequestConfig) {
        return PostControllerV2ApiFp(this.configuration).listUserPosts(authorId, searchStart, page, size, sort, options).then((request) => request(this.axios, this.basePath));
    }
}