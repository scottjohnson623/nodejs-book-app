/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "@shelf/jest-dynamodb",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
