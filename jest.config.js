module.exports = {
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1'
  },
  globals: {
    'ts-jest': {
      allowSyntheticDefaultImports: true
    }
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],

  transformIgnorePatterns: ['node_modules/(?!(jest-test|@ngrx))'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
};
