module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    jest: true,
  },
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'linebreak-style': 0,
    'import/prefer-default-export': 'off',
    'implicit-arrow-linebreak': 'off',
    'default-case': 'off',
    'no-param-reassign': 'off',
    'no-case-declarations': 'off',
    'function-paren-newline': 'off',
    'object-curly-newline': 'off',
    'jsx-quotes': 'off',
  },
  globals: {
    fetch: false,
  },
};
