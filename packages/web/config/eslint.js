const deepExtend = require('deep-extend');
const style = require('eslint-config-airbnb-base/rules/style');
const imports = require('eslint-config-airbnb-base/rules/imports');

module.exports = {
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.mjs', '.js', '.json'],
      },
    },
  },
  rules: {
    'import/extensions': ['error', 'ignorePackages', {
      ts: 'never',
      tsx: 'never',
      js: 'never',
      mjs: 'never',
      jsx: 'never',
    }],
    'import/no-extraneous-dependencies': [
      2,
      deepExtend(
        {},
        imports.rules['import/no-extraneous-dependencies'][1],
        {
          devDependencies: imports.rules['import/no-extraneous-dependencies'][1].devDependencies
            .concat([
              'config/**',
              'scripts/**',
            ]),
        },
      ),
    ],
    'import/prefer-default-export': 0,

    'react/jsx-filename-extension': [2, {
      extensions: ['.jsx', '.tsx'],
    }],

    'operator-linebreak': [2, 'after', style.rules['operator-linebreak'][2]],
    'spaced-comment': [
      2,
      style.rules['spaced-comment'][1],
      deepExtend(
        {},
        style.rules['spaced-comment'][2],
        {
          line: { markers: ['=', '!', '/'] },
        },
      ),
    ],
  },
};
