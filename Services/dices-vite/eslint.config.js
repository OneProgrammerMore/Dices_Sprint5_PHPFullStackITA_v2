import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // ... any rules you want
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'warn',
      "react/react-in-jsx-scope": "off", // Disable the rule here
     },
    // ... others are omitted for brevity
  },
];
