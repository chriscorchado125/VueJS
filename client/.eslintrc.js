module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'arrow-body-style': ['off'],
    'comma-dangle': ['off'],
    'func-names': ['off'],
    'import/extensions': ['off'],
    'import/no-unresolved': ['off'],
    'import/prefer-default-export': ['off'],
    'no-restricted-globals': ['off'],
    'no-lonely-if': ['off'],
    'no-plusplus': ['off'],
    'operator-linebreak': ['off'],
    'prefer-destructuring': ['off'],
    'prefer-arrow-callback': ['off'],
    semi: ['off'],
    'space-before-function-paren': ['off'],
    '@typescript-eslint/ban-ts-comment': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-var-requires': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/no-non-null-assertion': ['off'],
    'prettier/prettier': ['off']
  },
  ignorePatterns: ['**/*.js', '**/*.css'],
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
