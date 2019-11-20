module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
    ],
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "env": {
        "browser": true,
        "jest": true,
        "es6": true,
        "node": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 2019,
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    },
    "rules": {
        "semi": ["error", "always"],
        "@typescript-eslint/no-unused-vars": "error"
    }
};
