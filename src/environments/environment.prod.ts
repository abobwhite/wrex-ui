const apiBase = '/api';

export const environment = {
  production: true,
  apiEndpoints: {
    getRecommendations: `${apiBase}/users/:userId/recommendations`,
    patchRecommendation: `${apiBase}/recommendations/:recommendationId`
  }
};
