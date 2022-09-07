module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
  },
  overrides: [
    {
      files: ['server/**/*'],
      ...require('./.eslintrc.back.js'),
    },
    {
      files: ['admin/**/*'],
      ...require('./.eslintrc.front.js'),
    },
  ],
};
