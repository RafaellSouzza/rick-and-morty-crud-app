module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  testMatch: [
    '**/+(*.)+(spec).+(ts|js)?(x)'
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text-summary'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.module.ts',
    '!src/main.ts',
    '!src/environments/**',
    '!src/polyfills.ts'
  ]
};
