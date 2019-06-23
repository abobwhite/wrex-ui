// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const apiBase = '/api';

export const environment = {
  production: false,
  apiEndpoints: {
    getBranches: `${apiBase}/branches`,
    getLinesOfService: `${apiBase}/linesofservice`,
    getTags: `${apiBase}/tags`,
    getUser: `${apiBase}/users/:userId`,
    getUsers: `${apiBase}/users`,
    postUsersCode: `${apiBase}/users/code`,
    getRecommendations: `${apiBase}/users/:userId/recommendations`,
    patchRecommendation: `${apiBase}/recommendations/:recommendationId`
  }
};

import 'zone.js/dist/zone-error';  // Included with Angular CLI.
