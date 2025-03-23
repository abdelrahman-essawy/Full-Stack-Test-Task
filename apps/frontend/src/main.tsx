import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import ErrorBoundary from './error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { client } from '@easygenerator/api-sdk';

client.setConfig({
  baseUrl: 'http://localhost:3000',
  credentials: 'include',
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
