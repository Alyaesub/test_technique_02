const js = require("@eslint/js");
const tseslint = require("typescript-eslint");

module.exports = tseslint.config(
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ["**/*.ts"],
		rules: {
			"no-unused-vars": "off",
		},
	},
	{
		ignores: ["dist/**", "node_modules/**"],
	},
);
