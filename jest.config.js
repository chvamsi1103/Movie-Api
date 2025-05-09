module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'],
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["html", "text", "lcov"],
    coveragePathIgnorePatterns: [
      "/node_modules/",
      "/tests/"
    ],
  };
  