// This file is auto-generated by @hey-api/openapi-ts

import { type Options, authControllerSignup, authControllerLogin, authControllerLogout, userControllerGetCurrentUser } from '../sdk.gen';
import { queryOptions, type UseMutationOptions, type DefaultError } from '@tanstack/react-query';
import type { AuthControllerSignupData, AuthControllerSignupError, AuthControllerSignupResponse, AuthControllerLoginData, AuthControllerLoginError, AuthControllerLoginResponse, AuthControllerLogoutData, AuthControllerLogoutResponse, UserControllerGetCurrentUserData } from '../types.gen';
import { client as _heyApiClient } from '../client.gen';

export type QueryKey<TOptions extends Options> = [
    Pick<TOptions, 'baseUrl' | 'body' | 'headers' | 'path' | 'query'> & {
        _id: string;
        _infinite?: boolean;
    }
];

const createQueryKey = <TOptions extends Options>(id: string, options?: TOptions, infinite?: boolean): [
    QueryKey<TOptions>[0]
] => {
    const params: QueryKey<TOptions>[0] = { _id: id, baseUrl: (options?.client ?? _heyApiClient).getConfig().baseUrl } as QueryKey<TOptions>[0];
    if (infinite) {
        params._infinite = infinite;
    }
    if (options?.body) {
        params.body = options.body;
    }
    if (options?.headers) {
        params.headers = options.headers;
    }
    if (options?.path) {
        params.path = options.path;
    }
    if (options?.query) {
        params.query = options.query;
    }
    return [
        params
    ];
};

export const authControllerSignupQueryKey = (options: Options<AuthControllerSignupData>) => createQueryKey('authControllerSignup', options);

export const authControllerSignupOptions = (options: Options<AuthControllerSignupData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await authControllerSignup({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: authControllerSignupQueryKey(options)
    });
};

export const authControllerSignupMutation = (options?: Partial<Options<AuthControllerSignupData>>) => {
    const mutationOptions: UseMutationOptions<AuthControllerSignupResponse, AuthControllerSignupError, Options<AuthControllerSignupData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await authControllerSignup({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const authControllerLoginQueryKey = (options: Options<AuthControllerLoginData>) => createQueryKey('authControllerLogin', options);

export const authControllerLoginOptions = (options: Options<AuthControllerLoginData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await authControllerLogin({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: authControllerLoginQueryKey(options)
    });
};

export const authControllerLoginMutation = (options?: Partial<Options<AuthControllerLoginData>>) => {
    const mutationOptions: UseMutationOptions<AuthControllerLoginResponse, AuthControllerLoginError, Options<AuthControllerLoginData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await authControllerLogin({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const authControllerLogoutQueryKey = (options?: Options<AuthControllerLogoutData>) => createQueryKey('authControllerLogout', options);

export const authControllerLogoutOptions = (options?: Options<AuthControllerLogoutData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await authControllerLogout({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: authControllerLogoutQueryKey(options)
    });
};

export const authControllerLogoutMutation = (options?: Partial<Options<AuthControllerLogoutData>>) => {
    const mutationOptions: UseMutationOptions<AuthControllerLogoutResponse, DefaultError, Options<AuthControllerLogoutData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await authControllerLogout({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const userControllerGetCurrentUserQueryKey = (options?: Options<UserControllerGetCurrentUserData>) => createQueryKey('userControllerGetCurrentUser', options);

export const userControllerGetCurrentUserOptions = (options?: Options<UserControllerGetCurrentUserData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await userControllerGetCurrentUser({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: userControllerGetCurrentUserQueryKey(options)
    });
};