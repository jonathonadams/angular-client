'use strict';
module.exports = {
  preset: 'jest-preset-angular',
  setupTestFrameworkScriptFile: '<rootDir>/src/setupJest.ts',
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
  coverageReporters: ['json-summary', 'html', 'lcovonly', 'text', 'text-summary'],
  moduleNameMapper: {
    '@env/(.*)': '<rootDir>/src/environments/$1',
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@app-core/(.*)': '<rootDir>/src/app/core/$1',
    '@auth/(.*)': '<rootDir>/src/app/auth/$1',
    '@components/(.*)': '<rootDir>/src/app/components/$1',
    '@features/(.*)': '<rootDir>/src/app/features/$1',
    '@shared/(.*)': '<rootDir>/src/app/shared/$1',
    '@store/(.*)': '<rootDir>/src/app/store/$1',
    '@test/(.*)': '<rootDir>/src/test/$1'
  }
};
