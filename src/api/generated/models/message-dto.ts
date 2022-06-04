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



/**
 * 
 * @export
 * @interface MessageDto
 */
export interface MessageDto {
    /**
     * Uniq UUID of the message
     * @type {string}
     * @memberof MessageDto
     */
    'id'?: string;
    /**
     * UUID of the friendship where the message was sended
     * @type {string}
     * @memberof MessageDto
     */
    'friendshipId'?: string;
    /**
     * UUID of the user that made the request
     * @type {string}
     * @memberof MessageDto
     */
    'author'?: string;
    /**
     * Text content of the message
     * @type {string}
     * @memberof MessageDto
     */
    'content'?: string;
    /**
     * Creation date of the message
     * @type {string}
     * @memberof MessageDto
     */
    'createdAt'?: string;
}
