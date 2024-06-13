module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    // "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    //"plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
    // "linebreak-style": [2, "unix"],
    quotes: [2, "double"],
    semi: [2, "always"],
    curly: [2, "all"],
    camelcase: [
      2,
      {
        properties: "always",
      },
    ],
    eqeqeq: [2, "smart"],
    "one-var-declaration-per-line": [2, "always"],
    "new-cap": 2,
    "no-case-declarations": 0,
  },
};
