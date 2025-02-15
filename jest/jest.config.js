const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('../tsconfig.json');

module.exports = {
  rootDir: '../',
  coverageReporters: ['lcov'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};
