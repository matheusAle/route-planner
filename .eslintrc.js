module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "es6": true,
        "jest": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module",
        warnOnUnsupportedTypeScriptVersion: false,
        
    },
    "ignorePatterns": [
        "build",
        "dist",
      ],
    "plugins": [
        "prettier",
        "react",
        "react-hooks",
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "react/react-in-jsx-scope": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"
    },
    "settings": {
        "react": {
          "pragma": "React",  // Pragma to use, default to "React"
          "version": "detect", // React version. "detect" automatically picks the version you have installed.
        },
    }
};
