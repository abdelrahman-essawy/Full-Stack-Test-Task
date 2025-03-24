import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { client } from '@easygenerator/api-sdk';
import { env } from './env';

client.setConfig({
  baseUrl: env.REACT_APP_API_URL,
  credentials: 'include',
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
