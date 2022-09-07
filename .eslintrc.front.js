module.exports = {
  parser: '@babel/eslint-parser',
  extends: ['@strapi/eslint-config/front'],
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  globals: {
    strapi: false,
    window: false
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/jsx-no-constructed-context-values': 'warn',
    'react/jsx-no-useless-fragment': 'warn',
    'react/no-unstable-nested-components': 'warn',
  },
};
