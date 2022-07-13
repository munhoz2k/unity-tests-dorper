/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require('path');
const root = resolve(__dirname);

module.exports = {
  rootDir: root,
  roots: ['<rootDir>'],
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  modulePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  displayName: 'unit-tests',
  testMatch: ['<rootDir>/**/tests/*.spec.ts'],
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
  },
};
