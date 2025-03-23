import '../styles.css';
import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { client } from '@easygenerator/api-sdk';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { AuroraBackground } from '../ui/aurora-background';
import { BackgroundLines } from '../ui/background-lines';
import { SignupForm } from '../modules/auth/components/form';
import { LoginForm } from '../modules/auth/components/login-form';
import { Cover } from '../ui/cover';

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

              <Route
                path="/home"
                element={
                  <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
                    <h2 className="bg-clip-text  text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
                      Welcome to the <Cover>Application!</Cover>
                    </h2>
                    <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
                      Huge thanks to "name" for testing my website! You made
                      history… kind of. 😆
                    </p>
                  </BackgroundLines>
                }
              />
            </Routes>
          </AuroraBackground>
        </AnimatePresence>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </QueryClientProvider>
  );
}

export default App;
