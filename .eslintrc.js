module.exports = {
  // ignorePatterns: ["node_modules/", "src/components/"],
  parser: '@typescript-eslint/parser', //定义ESLint的解析器
  extends: [
    'react-app',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
  ], //定义文件继承的子规范
  plugins: ['@typescript-eslint', 'i18n', 'sort-imports-es6-autofix'], //定义了该eslint文件所依赖的插件
  // plugins: ['@typescript-eslint', 'i18n'], //定义了该eslint文件所依赖的插件
  env: {
    browser: true,
    node: true,
  },
  settings: {
    //自动发现React的版本，从而进行规范react代码
    react: {
      pragma: 'React',
      version: 'denotect',
    },
  },
  parserOptions: {
    //指定ESLint可以解析JSX语法
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-var-requires': 1,
    '@typescript-eslint/triple-slash-reference': 1,
    '@typescript-eslint/ban-ts-ignore': 1,
    'no-unused-vars': 2,
    '@typescript-eslint/no-unused-vars': 2,
    'react/display-name': 0,
    'no-prototype-builtins': 1,
    'no-irregular-whitespace': 1,
    'react/prop-types': 0,
    'i18n/i18n-message-id': 1,
    'sort-imports-es6-autofix/sort-imports-es6': [
      1,
      {
        ignoreCase: false,
        // ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['all', 'multiple', 'single', 'none'],
      },
    ],
  },
  overrides: [{
    files: ['config/**/*.js', 'scripts/**/*.js', 'rules/**/*.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  }, ],
};