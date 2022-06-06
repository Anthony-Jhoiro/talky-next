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
 * @interface FriendDto
 */
export interface FriendDto {
    /**
     * Uniq UUID of the User
     * @type {string}
     * @memberof FriendDto
     */
    'id'?: string;
    /**
     * Name that the use chose to display
     * @type {string}
     * @memberof FriendDto
     */
    'displayedName'?: string;
    /**
     * Link to the user profile picture
     * @type {string}
     * @memberof FriendDto
     */
    'profilePicture'?: string;
    /**
     * Date time of when the user was last online
     * @type {string}
     * @memberof FriendDto
     */
    'lastSeen'?: string;
    /**
     * UUID of the friendship between the current user and this user
     * @type {string}
     * @memberof FriendDto
     */
    'friendshipId'?: string;
}
