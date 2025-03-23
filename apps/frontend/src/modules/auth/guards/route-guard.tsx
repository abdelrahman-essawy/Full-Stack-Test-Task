﻿import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../use-auth.hook';
import { RouteGuardInterface, RouteGuardOptions } from './types';

export const RouteGuard = (opts: RouteGuardOptions) => {
  const { guards } = opts;
  const [canActivateRoute, setCanActivateRoute] = useState<boolean | string>();

  const { isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const checkCanActivate = async () => {
      try {
        const results = await Promise.all(
          guards.map((guard) => guard({ isAuthenticated, isLoading }))
        );
        const redirectPath = results.find((result) => result !== true);
        return redirectPath === undefined ? true : redirectPath;
      } catch (error) {
        return '/error';
      }
    };

    checkCanActivate().then((result) => {
      setCanActivateRoute(result);
    });
  }, [guards, isAuthenticated, isLoading]);

  if (canActivateRoute === undefined) {
    return;
  }

  return typeof canActivateRoute === 'boolean' && canActivateRoute ? (
    <Outlet />
  ) : (
    <Navigate to={canActivateRoute as string} />
  );
};

export const isSignedIn: (redirectTo: string) => RouteGuardInterface =
  (redirectTo) =>
  async ({ isAuthenticated }) => {
    return Promise.resolve(isAuthenticated).then((is) => is || redirectTo);
  };

export const isNotSignedIn: (redirectTo: string) => RouteGuardInterface =
  (redirectTo) =>
  async ({ isAuthenticated }) => {
    return Promise.resolve(!isAuthenticated).then((is) => is || redirectTo);
  };
