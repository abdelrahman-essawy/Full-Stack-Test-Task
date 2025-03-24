import '../styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AppRoutes } from './router';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Toaster position="bottom-right" reverseOrder={false} />
    </QueryClientProvider>
  );
};

export default App;
