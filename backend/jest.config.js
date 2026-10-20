module.exports = {
  testEnvironment: "node",
  setupFiles: ["./tests/setup.js"],
  collectCoverageFrom: ["src/controllers/**/*.js", "src/middleware/**/*.js"],
  coverageThreshold: {
    global: { lines: 70, statements: 70, functions: 70, branches: 60 },
  },
};