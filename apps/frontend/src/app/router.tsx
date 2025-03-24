import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import {
  isNotSignedIn,
  isSignedIn,
  RouteGuard,
} from '../modules/auth/guards/route-guard';
import { RootLayout } from './layout';
import { lazy } from 'react';
import { PageTransition } from '../ui/page-transition';
import { NotFound } from './not-found';

const SignupPage = lazy(() =>
  import('../modules/auth/pages/signup-page').then((module) => ({
    default: module.SignupPage,
  }))
);
const HomePage = lazy(() =>
  import('../modules/home/home-page').then((module) => ({
    default: module.HomePage,
  }))
);
const LoginPage = lazy(() =>
  import('../modules/auth/pages/login-page').then((module) => ({
    default: module.LoginPage,
  }))
);

export function AppRoutes() {
  const location = useLocation();

  return (
    <RootLayout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route element={<RouteGuard guards={[isNotSignedIn('/')]} />}>
            <Route
              path="login"
              element={
                <PageTransition>
                  <LoginPage />
                </PageTransition>
              }
            />
            <Route
              path="signup"
              element={
                <PageTransition>
                  <SignupPage />
                </PageTransition>
              }
            />
          </Route>

          {/* Protected Routes */}
          <Route
            path="/"
            element={<RouteGuard guards={[isSignedIn('/login')]} />}
          >
            <Route
              index
              element={
                <PageTransition>
                  <HomePage />
                </PageTransition>
              }
            />
          </Route>

          {/* 404 Route */}
          <Route
            path="*"
            element={
              <PageTransition>
                <NotFound />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </RootLayout>
  );
}
