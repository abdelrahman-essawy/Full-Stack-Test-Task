import '../styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { client } from '@easygenerator/api-sdk';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { AuroraBackground } from '../ui/aurora-background';
import { SignupForm } from '../modules/auth/components/signup-form';
import { LoginForm } from '../modules/auth/components/login-form';
import { HomePage } from '../modules/home/home-page';
import {
  isNotSignedIn,
  isSignedIn,
  RouteGuard,
} from '../modules/auth/guards/route-guard';
import { AnimatedDev } from '../ui/animated-dev';
import { BackgroundLines } from '../ui/background-lines';

const queryClient = new QueryClient();

client.setConfig({
  baseUrl: 'http://localhost:3000',
});

// Define the router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <RouteGuard guards={[isNotSignedIn('/home')]} />,
    children: [
      {
        element: (
          <AnimatedDev>
            <SignupForm />
          </AnimatedDev>
        ),
        index: true,
      },
      {
        path: '/login',
        element: (
          <AnimatedDev>
            <LoginForm />
          </AnimatedDev>
        ),
      },
    ],
  },
  {
    path: '/home',
    element: <RouteGuard guards={[isSignedIn('/login')]} />,
    children: [
      {
        index: true,
        element: (
          <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
            <AnimatedDev>
              <HomePage />
            </AnimatedDev>
          </BackgroundLines>
        ),
      },
    ],
  },
]);

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        <AuroraBackground>
          <RouterProvider router={router} />
        </AuroraBackground>
      </AnimatePresence>
      <Toaster position="bottom-right" reverseOrder={false} />
    </QueryClientProvider>
  );
}

export default App;
