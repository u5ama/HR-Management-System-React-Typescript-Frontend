/**
 * Interface for the general response from backend API
 *
 * @template T - The type of the response data object
 */
export interface IResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

// /**
//  * `enum` for custom defined API error statuses
//  *
//  */
// export enum APIErrorType {
//   default = 'default',
//   TokenExpired = 'Token Expired',
//   NotAuthorized = 'Not Authorized',
// }

/**
 * Base interface for API object entities
 *
 * @example
 * interface IUser extends IApiObject {}
 */
export interface IApiObject {
  id: number;
  created_at: string;
  updated_at: string;
}
