// This file is auto-generated by @hey-api/openapi-ts

import type { Options as ClientOptions, TDataShape, Client } from '@hey-api/client-axios';
import type { AuthControllerSignupData, AuthControllerSignupResponse, AuthControllerSignupError, AuthControllerLoginData, AuthControllerLoginResponse, AuthControllerLoginError, UserControllerGetCurrentUserData, UserControllerGetCurrentUserResponse } from './types.gen';
import { client as _heyApiClient } from './client.gen';

export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean> = ClientOptions<TData, ThrowOnError> & {
    /**
     * You can provide a client instance returned by `createClient()` instead of
     * individual options. This might be also useful if you want to implement a
     * custom client.
     */
    client?: Client;
    /**
     * You can pass arbitrary values through the `meta` object. This can be
     * used to access values that aren't defined as part of the SDK function.
     */
    meta?: Record<string, unknown>;
};

/**
 * Signup a new user
 */
export const authControllerSignup = <ThrowOnError extends boolean = false>(options: Options<AuthControllerSignupData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<AuthControllerSignupResponse, AuthControllerSignupError, ThrowOnError>({
        url: '/api/auth/signup',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Login a user
 */
export const authControllerLogin = <ThrowOnError extends boolean = false>(options: Options<AuthControllerLoginData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<AuthControllerLoginResponse, AuthControllerLoginError, ThrowOnError>({
        url: '/api/auth/login',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Get current user profile
 */
export const userControllerGetCurrentUser = <ThrowOnError extends boolean = false>(options?: Options<UserControllerGetCurrentUserData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<UserControllerGetCurrentUserResponse, unknown, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/api/user/me',
        ...options
    });
};