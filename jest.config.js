'use strict';
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setupJest.ts'],
  roots: ['<rootDir>/src'],
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 20
    }
  },
  coverageReporters: [
    'json-summary',
    'html',
    'lcovonly',
    'text',
    'text-summary'
  ],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
    '@env/(.*)': '<rootDir>/src/environments/$1',
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@app-core/(.*)': '<rootDir>/src/app/core/$1',
    '@auth/(.*)': '<rootDir>/src/app/auth/$1',
    '@nav/(.*)': '<rootDir>/src/app/navigation/$1',
    '@components/(.*)': '<rootDir>/src/app/components/$1',
    '@features/(.*)': '<rootDir>/src/app/features/$1',
    '@shared/(.*)': '<rootDir>/src/app/shared/$1',
    '@store/(.*)': '<rootDir>/src/app/store/$1',
    '@tests/(.*)': '<rootDir>/src/tests/$1'
  }
};
