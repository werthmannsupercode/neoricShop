import { defineConfig } from '@shopify/hydrogen/config';

export default defineConfig({
  shopify: {
    storeDomain: 'noric-watches.myshopify.com',
    storefrontToken: '0fe1b8f472d40c7aa06801590085df8a',
    storefrontApiVersion: '2022-07',
  },
  logger: {
    trace: (request, ...args) => console.log(request.url, ...args),
    error: async (request, error) => {
      console.error(error);
      await myErrorTrackingService.send(request, error);
    },
    showCacheApiStatus: true,
    showCacheControlHeader: true,
    showQueryTiming: true,
    showUnusedQueryProperties: true,
  },
});
