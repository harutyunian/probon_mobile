module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        project: './tsconfig.json',
    },
    plugins: ['@typescript-eslint', 'react', 'react-native', 'react-hooks'],
    extends: [
        'airbnb',
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-native/all',
        'plugin:react-hooks/recommended',
        'prettier',
    ],
    env: {
        'react-native/react-native': true,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        // your custom rules here
        'react/react-in-jsx-scope': 'off', // for React 17+
        'react-native/no-inline-styles': 'off',
        '@typescript-eslint/no-unused-vars': ['warn'],
        'no-console': 'warn',
    },
};
