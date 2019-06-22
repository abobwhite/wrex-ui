const apiBase = '/api';

export const environment = {
  production: true,
  apiEndpoints: {
    recommendation: `${apiBase}/users/:userId/recommendations`,
  }
};
