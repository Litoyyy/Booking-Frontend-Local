import Zod from 'zod';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('zod', Zod);
});