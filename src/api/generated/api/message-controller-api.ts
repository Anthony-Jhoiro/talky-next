/* tslint:disable */
/* eslint-disable */
/**
 * Social API
 * Documentation of Social API
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
import { MessageDto } from '../models';
// @ts-ignore
import { MessageRequestDto } from '../models';
// @ts-ignore
import { PageMessageDto } from '../models';
/**
 * MessageControllerApi - axios parameter creator
 * @export
 */
export const MessageControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * List messages for a specific friendship
         * @param {string} friendshipId 
         * @param {'AFTER' | 'BEFORE'} [fetch] 
         * @param {string} [date] 
         * @param {number} [limit] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listMessages: async (friendshipId: string, fetch?: 'AFTER' | 'BEFORE', date?: string, limit?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'friendshipId' is not null or undefined
            assertParamExists('listMessages', 'friendshipId', friendshipId)
            const localVarPath = `/api/v1/messages/friendship/{friendshipId}`
                .replace(`{${"friendshipId"}}`, encodeURIComponent(String(friendshipId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (fetch !== undefined) {
                localVarQueryParameter['fetch'] = fetch;
            }

            if (date !== undefined) {
                localVarQueryParameter['date'] = (date as any instanceof Date) ?
                    (date as any).toISOString() :
                    date;
            }

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
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
         * Send a message, if the reciepient has registered a device, he will recieved a push notification.
         * @param {MessageRequestDto} messageRequestDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        postMessage: async (messageRequestDto: MessageRequestDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'messageRequestDto' is not null or undefined
            assertParamExists('postMessage', 'messageRequestDto', messageRequestDto)
            const localVarPath = `/api/v1/messages`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(messageRequestDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * MessageControllerApi - functional programming interface
 * @export
 */
export const MessageControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = MessageControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * List messages for a specific friendship
         * @param {string} friendshipId 
         * @param {'AFTER' | 'BEFORE'} [fetch] 
         * @param {string} [date] 
         * @param {number} [limit] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listMessages(friendshipId: string, fetch?: 'AFTER' | 'BEFORE', date?: string, limit?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PageMessageDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listMessages(friendshipId, fetch, date, limit, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Send a message, if the reciepient has registered a device, he will recieved a push notification.
         * @param {MessageRequestDto} messageRequestDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async postMessage(messageRequestDto: MessageRequestDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MessageDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.postMessage(messageRequestDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * MessageControllerApi - factory interface
 * @export
 */
export const MessageControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = MessageControllerApiFp(configuration)
    return {
        /**
         * List messages for a specific friendship
         * @param {string} friendshipId 
         * @param {'AFTER' | 'BEFORE'} [fetch] 
         * @param {string} [date] 
         * @param {number} [limit] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listMessages(friendshipId: string, fetch?: 'AFTER' | 'BEFORE', date?: string, limit?: number, options?: any): AxiosPromise<PageMessageDto> {
            return localVarFp.listMessages(friendshipId, fetch, date, limit, options).then((request) => request(axios, basePath));
        },
        /**
         * Send a message, if the reciepient has registered a device, he will recieved a push notification.
         * @param {MessageRequestDto} messageRequestDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        postMessage(messageRequestDto: MessageRequestDto, options?: any): AxiosPromise<MessageDto> {
            return localVarFp.postMessage(messageRequestDto, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * MessageControllerApi - object-oriented interface
 * @export
 * @class MessageControllerApi
 * @extends {BaseAPI}
 */
export class MessageControllerApi extends BaseAPI {
    /**
     * List messages for a specific friendship
     * @param {string} friendshipId 
     * @param {'AFTER' | 'BEFORE'} [fetch] 
     * @param {string} [date] 
     * @param {number} [limit] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MessageControllerApi
     */
    public listMessages(friendshipId: string, fetch?: 'AFTER' | 'BEFORE', date?: string, limit?: number, options?: AxiosRequestConfig) {
        return MessageControllerApiFp(this.configuration).listMessages(friendshipId, fetch, date, limit, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Send a message, if the reciepient has registered a device, he will recieved a push notification.
     * @param {MessageRequestDto} messageRequestDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MessageControllerApi
     */
    public postMessage(messageRequestDto: MessageRequestDto, options?: AxiosRequestConfig) {
        return MessageControllerApiFp(this.configuration).postMessage(messageRequestDto, options).then((request) => request(this.axios, this.basePath));
    }
}
