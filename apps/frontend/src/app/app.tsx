import '../styles.css';
import { Route, Routes } from 'react-router-dom';
import { SignupForm } from '../modules/auth/components/form';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { client } from '@easygenerator/api-sdk';
import { Toaster } from 'react-hot-toast';
import { AuroraBackground } from '../ui/aurora-background';
import { BackgroundLines } from '../ui/background-lines';

const queryClient = new QueryClient();

client.setConfig({
  baseUrl: 'http://localhost:3000',
});

// <motion.div
//   initial={{ opacity: 0.0, y: 40 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   transition={{
//     delay: 0.3,
//     duration: 0.8,
//     ease: 'easeInOut',
//   }}
//   className="relative flex flex-col gap-4 items-center justify-center"
// >

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <AuroraBackground>
                <div className="z-10 w-full px-8">
                  <SignupForm />
                </div>
              </AuroraBackground>
            }
          />
          <Route
            path="/home"
            element={
              <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
                <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl md:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
                  Sanjana Airlines, <br /> Sajana Textiles.
                </h2>
                <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
                  Get the best advices from our experts, including expert
                  artists, painters, marathon enthusiasts and RDX, totally free.
                </p>
              </BackgroundLines>
            }
          />
        </Routes>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </QueryClientProvider>
  );
}

export default App;
