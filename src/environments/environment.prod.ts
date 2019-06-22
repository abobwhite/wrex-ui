export const environment = {
  production: true,
  apiEndpoints: {
    getRecommendations: `/users/:userId/recommendations`,
    patchRecommendation: `/users/:userId/recommendations/:recommendationId`
  }
};
