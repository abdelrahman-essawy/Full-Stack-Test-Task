import { defaultPlugins, defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'http://localhost:3000/api-json',
  output: 'src/gen',
  plugins: [
    ...defaultPlugins,
    '@hey-api/client-fetch',
    '@tanstack/react-query',
  ],
});
