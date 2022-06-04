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


import { UserDto } from './user-dto';

/**
 * 
 * @export
 * @interface FriendRequestDto
 */
export interface FriendRequestDto {
    /**
     * UUID of the friendship
     * @type {string}
     * @memberof FriendRequestDto
     */
    'id'?: string;
    /**
     * 
     * @type {UserDto}
     * @memberof FriendRequestDto
     */
    'sender'?: UserDto;
    /**
     * 
     * @type {UserDto}
     * @memberof FriendRequestDto
     */
    'recipient'?: UserDto;
    /**
     * Current status of the friend request
     * @type {string}
     * @memberof FriendRequestDto
     */
    'status'?: FriendRequestDtoStatusEnum;
    /**
     * Creation datetime
     * @type {string}
     * @memberof FriendRequestDto
     */
    'creationDate'?: string;
    /**
     * Last update datetime
     * @type {string}
     * @memberof FriendRequestDto
     */
    'lastUpdate'?: string;
}

/**
    * @export
    * @enum {string}
    */
export enum FriendRequestDtoStatusEnum {
    ACCEPTED = 'ACCEPTED',
    PENDING = 'PENDING',
    DENIED = 'DENIED'
}


