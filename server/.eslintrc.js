module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: ['prettier', 'standard'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {},
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
