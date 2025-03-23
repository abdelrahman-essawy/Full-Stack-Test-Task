import '../styles.css';
import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { client } from '@easygenerator/api-sdk';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { AuroraBackground } from '../ui/aurora-background';
import { SignupForm } from '../modules/auth/components/form';
import { LoginForm } from '../modules/auth/components/login-form';
import { HomePage } from '../modules/home/home-page';

const queryClient = new QueryClient();

client.setConfig({
  baseUrl: 'http://localhost:3000',
});

// function PreAuthLayout() {}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <AnimatePresence mode="wait">
          <AuroraBackground>
            <Routes>
              <Route
                path="/"
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="z-10 w-full px-8"
                  >
                    <SignupForm />
                  </motion.div>
                }
              />
              <Route
                path="/login"
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="z-10 w-full px-8"
                  >
                    <LoginForm />
                  </motion.div>
                }
              />

              <Route path="/home" element={<HomePage />} />
            </Routes>
          </AuroraBackground>
        </AnimatePresence>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </QueryClientProvider>
  );
}

export default App;
