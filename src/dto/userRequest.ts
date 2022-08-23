/* 
 * DTO - Data Transfer Object
 * Handles data passing from controller to useCase
 * Also Handles input validation
 */

export interface UserRequest {
	id: number;
	username: string;
	password: string;
	type: string;
	validate(): void;
}
