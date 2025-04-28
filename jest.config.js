/** @type {import('ts-jest').JestConfigWithTsJest} **/
/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["<rootDir>/__tests__/**/*.+(ts|tsx|js)", "<rootDir>/**/?(*.)+(spec|test).+(ts|tsx|js)"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
};