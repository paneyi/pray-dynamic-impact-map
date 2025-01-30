export default {
	preset: "ts-jest",
	testEnvironment: "node",
	roots: ["<rootDir>/tests"],
	transform: {
		"^.+\\.ts$": "ts-jest",
	},
	setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
};