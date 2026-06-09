export { ApiClient } from '@ank-cora/sdk';
export { coraSdk } from '@/sdk';

/** @deprecated Use `coraSdk.client` from `@/sdk` */
export const apiClient = coraSdk.client;
