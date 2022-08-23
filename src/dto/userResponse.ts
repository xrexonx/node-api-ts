/* 
 * DTO - Data Transfer Object
 * Handles data passing from controller to useCase
 * Also Handles input validation
 */
export interface UserResponse {
	id: number;
	username: string;
	type: string;
}