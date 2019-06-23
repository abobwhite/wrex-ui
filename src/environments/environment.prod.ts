const apiBase = '/api';

export const environment = {
  production: true,
  apiEndpoints: {
    getBranches: `${apiBase}/branches`,
    getLinesOfService: `${apiBase}/linesofservice`,
    getTags: `${apiBase}/tags`,
    getUser: `${apiBase}/users/:userId`,
    getUsers: `${apiBase}/users`,
    postUsersCode: `${apiBase}/users/code`,
    getRecommendations: `${apiBase}/users/:userId/recommendations`,
    patchRecommendation: `${apiBase}/recommendations/:recommendationId`,
    getStatus: `${apiBase}/users/:userId/statuses`,
    getStatuses: `${apiBase}/users/:userId/statuses/:statusId`,
    postStatus: `${apiBase}/users/:userId/statuses`,
  }
};
