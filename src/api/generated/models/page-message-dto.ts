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


import { MessageDto } from './message-dto';
import { PageableObject } from './pageable-object';
import { Sort } from './sort';

/**
 * 
 * @export
 * @interface PageMessageDto
 */
export interface PageMessageDto {
    /**
     * 
     * @type {number}
     * @memberof PageMessageDto
     */
    'totalPages'?: number;
    /**
     * 
     * @type {number}
     * @memberof PageMessageDto
     */
    'totalElements'?: number;
    /**
     * 
     * @type {number}
     * @memberof PageMessageDto
     */
    'size'?: number;
    /**
     * 
     * @type {Array<MessageDto>}
     * @memberof PageMessageDto
     */
    'content'?: Array<MessageDto>;
    /**
     * 
     * @type {number}
     * @memberof PageMessageDto
     */
    'number'?: number;
    /**
     * 
     * @type {Sort}
     * @memberof PageMessageDto
     */
    'sort'?: Sort;
    /**
     * 
     * @type {number}
     * @memberof PageMessageDto
     */
    'numberOfElements'?: number;
    /**
     * 
     * @type {PageableObject}
     * @memberof PageMessageDto
     */
    'pageable'?: PageableObject;
    /**
     * 
     * @type {boolean}
     * @memberof PageMessageDto
     */
    'first'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PageMessageDto
     */
    'last'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PageMessageDto
     */
    'empty'?: boolean;
}

