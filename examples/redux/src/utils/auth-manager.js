import authWeb from './auth-web';

const app = authWeb({
  clientId: '7959aebd-ae8b-4ef6-b424-33f4475c8713',
  tenant: 'f7b92dbe-2b0c-4c1f-8162-cec6caf7ed7f',
  responseType: 'id_token',
});

export default app;
