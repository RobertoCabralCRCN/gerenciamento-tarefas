/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('./jest.config.js');

module.exports = {
  ...baseConfig,
  testMatch: ['<rootDir>/test/**/*.e2e-spec.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.e2e.ts'],
  testTimeout: 15000,
};
