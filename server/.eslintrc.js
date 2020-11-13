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
  rules: {}
}
