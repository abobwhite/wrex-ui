const apiBase = '/api';

export const environment = {
  production: true,
  apiEndpoints: {
    getUser: `${apiBase}/user/:userId`,
    getRecommendations: `${apiBase}/users/:userId/recommendations`,
    patchRecommendation: `${apiBase}/recommendations/:recommendationId`
  }
};
