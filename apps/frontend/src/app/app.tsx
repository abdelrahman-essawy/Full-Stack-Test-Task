import '../styles.css';
import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { AuroraBackground } from '../ui/aurora-background';
import { HomePage } from '../modules/home/home-page';
import {
  isNotSignedIn,
  isSignedIn,
  RouteGuard,
} from '../modules/auth/guards/route-guard';
import { AnimatedDev } from '../ui/animated-dev';
import { BackgroundLines } from '../ui/background-lines';
import { Header } from '../modules/header';
import { SignupPage } from '../modules/auth/pages/signup-page';
import { LoginPage } from '../modules/auth/pages/login-page';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        <AuroraBackground header={<Header />}>
          <AppRoutes />
        </AuroraBackground>
      </AnimatePresence>
      <Toaster position="bottom-right" reverseOrder={false} />
    </QueryClientProvider>
  );
}

export default App;

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RouteGuard guards={[isNotSignedIn('/')]} />}>
        <Route
          index
          path={'signup'}
          element={
            <AnimatedDev>
              <SignupPage />
            </AnimatedDev>
          }
        />
        <Route
          path="login"
          element={
            <AnimatedDev>
              <LoginPage />
            </AnimatedDev>
          }
        />
      </Route>

      <Route path="/" element={<RouteGuard guards={[isSignedIn('/login')]} />}>
        <Route
          index
          element={
            <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
              <AnimatedDev>
                <HomePage />
              </AnimatedDev>
            </BackgroundLines>
          }
        />
      </Route>
    </Routes>
  );
}
