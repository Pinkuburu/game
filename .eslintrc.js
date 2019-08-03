module.exports = {
  extends: [
    'eslint-config-alloy/react',
    'eslint-config-alloy/typescript',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  globals: {
    // 这里填入你的项目需要的全局变量
    // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
    // jQuery: false,
    // $: false
    _: false // lodash
  },
  rules: {
    // 这里填入你的项目需要的个性化配置，比如：
    //
    // // 一个缩进必须用两个空格替代
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: false,
        CallExpression: { arguments: 'off' },
        ignoreComments: true
      }
    ],
    // 一个缩进必须用两个空格替代
    '@typescript-eslint/indent': [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: false,
        CallExpression: { arguments: 'off' },
        ignoreComments: true
      }
    ],
    'react/jsx-indent': [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: false,
        CallExpression: { arguments: 'off' },
        ignoreComments: true
      }
    ],
    'react/jsx-indent-props': [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: false,
        CallExpression: { arguments: 'off' },
        ignoreComments: true
      }
    ],

    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-empty-interface': 'off'
  }
};

// {
//   "plugins": ["typescript"],
//   "env": {
//     "browser": true,
//     "node": true,
//     "mocha": true,
//     "jest": true,
//     "es6": true
//   },
//   "settings": {
//     "import/resolver": {
//       "alias": {
//         "map": [["@", "./src"]],
//         "extensions": [".ts", ".js", ".jsx", ".json"]
//       }
//     }
//   },
//   "extends": ["@aimake/eslint-config", "plugin:react/recommended", "plugin:prettier/recommended"],
//   "rules": {
//     "jsx-wrap-multiline": "off",
//     "no-unused-vars": ["error"],
//     "import/no-unresolved": 0,
//     "linebreak-style": 0,
//     "react/no-array-index-key": 0,
//     "no-console": 0,
//     // ref:https://www.jianshu.com/p/a09a5a222a76
//     // 在类的非静态方法中，必须存在对 this 的引用
//     // @off 太严格了
//     "class-methods-use-this": "off",
//     // 组件必须有 displayName 属性
//     // @off 不强制要求写 displayName
//     "react/display-name": "off",
//     // 禁止使用一些不安全的生命周期函数(将要废弃的)
//     "react/no-unsafe": "error",
//     // state需要在构造函数中定义
//     "react/state-in-constructor": "error",
//     // 禁止使用已废弃的 api
//     "react/no-deprecated": "error",
//     // 禁止直接修改 this.state
//     "react/no-direct-mutation-state": "error",
//     // 禁止在 PureComponent 中使用 shouldComponentUpdate
//     "react/no-redundant-should-component-update": "error",
//     // 禁止在 componentWillUpdate 中使用 setState
//     "react/no-will-update-set-state": "error",
//     // 禁止出现重复的 props
//     "react/jsx-no-duplicate-props": "error",
//     // 大括号内的首尾必须有换行
//     "object-curly-newline": "off"
//   },
//   "parser": "babel-eslint"
// }
