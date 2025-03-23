// This file is auto-generated by @hey-api/openapi-ts

export type SignupResDto = {
    message: string;
};

export type ObjectId = {
    [key: string]: unknown;
};

export type User = {
    /**
     * The unique identifier of the user
     */
    _id: ObjectId;
    /**
     * The unique identifier of the user
     */
    email: string;
    /**
     * The full name of the user
     */
    name: string;
    /**
     * Date of creation
     */
    createdAt: string;
    /**
     * Date of last update
     */
    updatedAt: string;
};

export type LoginResDto = {
    /**
     * Message to the user
     */
    message: string;
    /**
     * Access token for the user
     */
    accessToken: string;
    /**
     * User details
     */
    user: User;
};

export type BackendResponseDto = {
    /**
     * Message to the user
     */
    message: string;
};

export type GetProfileResDto = {
    /**
     * Message to the user
     */
    message: string;
    /**
     * User details
     */
    user: User;
};

export type AuthControllerSignupData = {
    body: {
        email: string;
        name: string;
        password: string;
    };
    path?: never;
    query?: never;
    url: '/api/auth/signup';
};

export type AuthControllerSignupErrors = {
    409: {
        statusCode: number;
        message: string;
        error?: string;
    };
};

export type AuthControllerSignupError = AuthControllerSignupErrors[keyof AuthControllerSignupErrors];

export type AuthControllerSignupResponses = {
    200: SignupResDto;
};

export type AuthControllerSignupResponse = AuthControllerSignupResponses[keyof AuthControllerSignupResponses];

export type AuthControllerLoginData = {
    body: {
        email: string;
        password: string;
    };
    path?: never;
    query?: never;
    url: '/api/auth/login';
};

export type AuthControllerLoginErrors = {
    401: {
        statusCode: number;
        message: string;
        error?: string;
    };
};

export type AuthControllerLoginError = AuthControllerLoginErrors[keyof AuthControllerLoginErrors];

export type AuthControllerLoginResponses = {
    200: LoginResDto;
};

export type AuthControllerLoginResponse = AuthControllerLoginResponses[keyof AuthControllerLoginResponses];

export type AuthControllerLogoutData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/auth/logout';
};

export type AuthControllerLogoutResponses = {
    200: BackendResponseDto;
};

export type AuthControllerLogoutResponse = AuthControllerLogoutResponses[keyof AuthControllerLogoutResponses];

export type UserControllerGetCurrentUserData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/user/me';
};

export type UserControllerGetCurrentUserResponses = {
    200: GetProfileResDto;
};

export type UserControllerGetCurrentUserResponse = UserControllerGetCurrentUserResponses[keyof UserControllerGetCurrentUserResponses];

export type ClientOptions = {
    baseUrl: string;
};