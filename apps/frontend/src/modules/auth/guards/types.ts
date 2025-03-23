export type RouteGuardState = {
  isAuthenticated: boolean;
  isLoading: boolean;
};

export interface RouteGuardInterface {
  (state: RouteGuardState): Promise<boolean | string>;
}

export interface RouteGuardOptions {
  guards: RouteGuardInterface[];
}
