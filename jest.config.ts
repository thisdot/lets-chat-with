const { getJestProjects } = require('@nrwl/jest');

export default {
  modulePathIgnorePatterns: ['<rootDir>/amplify/#current-cloud-backend'],
  projects: getJestProjects(),
};
