const apiBase = '/api';

export const environment = {
  production: true,
  apiEndpoints: {
    getBranches: `${apiBase}/branches`,
    getLinesOfService: `${apiBase}/linesofservice`,
    getUser: `${apiBase}/users/:userId`,
    getRecommendations: `${apiBase}/users/:userId/recommendations`,
    patchRecommendation: `${apiBase}/recommendations/:recommendationId`
  }
};
