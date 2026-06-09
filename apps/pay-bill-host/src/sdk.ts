import { createCoraSdk } from '@ank-cora/sdk';

export const coraSdk = createCoraSdk({
  baseUrl: import.meta.env.VITE_API_URL ?? '/api',
  useMocks: import.meta.env.VITE_USE_MOCKS !== 'false',
});
