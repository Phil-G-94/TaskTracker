module.exports = {
    testEnvironment: "node",
    transform: {
        "^.+\\.jsx?$": "babel-jest",
    },
    moduleFileExtensions: ["js", "json", "node"],
    testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
};
