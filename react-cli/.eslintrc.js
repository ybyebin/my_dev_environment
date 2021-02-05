module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['prettier'],
  extends: [
    'eslint-config-ali/react',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
    commonjs: true,
  },
  globals: {
    React: 'readonly',
    // 这里填入你的项目中只读的全局变量
  },
  rules: {
    'prettier/prettier': 1, // 被prettier标记的地方抛出错误信息
    eqeqeq: 2, // 必须使用全等
    'comma-dangle': 1, // 对象的最后一个属性末尾必须有逗号
    'comma-spacing': 1, // 逗号前禁止有空格，逗号后必须要有空格
    'no-cond-assign': 2, //禁止在测试表达式中使用赋值语句，除非这个赋值语句被括号包起来了
    'no-debugger': 2,
    'no-undef': 2,
    'arrow-body-style': 1,
    'no-dupe-args': 2, // 禁止在函数参数中出现重复名称的参数
    'no-dupe-keys': 2, // 禁止在对象字面量中出现重复名称的键名
    'no-duplicate-case': 2, // 禁止在 switch 语句中出现重复测试表达式的 case
    'no-extra-semi': 2, // 禁止出现多余的分号
    'use-isnan': 2, // 必须使用 isNaN(foo) 而不是 foo === NaN
    'no-global-assign': 2, // 禁止对全局变量赋值
    semi: 1, // 结尾加分号
    'no-const-assign': 2, // 禁止对使用 const 定义的常量重新赋值
    'no-duplicate-imports': 2, // 禁止重复 import 模块
    'no-new-symbol': 2, // 禁止使用 new 来生成 Symbol
    'no-this-before-super': 2, // 禁止在 super 被调用之前使用 this 或 super
    'no-useless-computed-key': 2, // 禁止出现没必要的计算键名，比如 let a = { ['0']: 0 };
    'no-useless-constructor': 2, // 禁止出现没必要的 constructor
    'no-var': 1,
    'no-redeclare': 2,
    'object-shorthand': 1,
    'no-console': 0,
    'id-length': ['error', { min: 2, max: 35 }], // 变量命名长度
    camelcase: 'error', // 变量小驼峰命名
    'new-cap': 'error', // 用大驼峰式命名类
    'no-underscore-dangle': 'error', // 不要用前置或后置下划线
    indent: ['error', 2], // 两空格
    'space-before-blocks': 'error', // 在大括号前空一格
    'keyword-spacing': 'error', // 在控制语句(if, while 等)的圆括号前空一格。在函数调用和定义时，参数列表和函数名之间不空格。
    'space-infix-ops': 'error', // 用空格来隔开运算符。
    'padded-blocks': 'error', // 不要用空白行填充块。
    'no-multiple-empty-lines': 'error', // 不要在代码之间使用多个空白行填充。
    'space-in-parens': 'error', // 圆括号里不要加空格.
    'array-bracket-spacing': 'error', // 方括号里不要加空格。
    'object-curly-spacing': 'error', // 花括号里加空格。
    'block-spacing': 'error', // 作为语句的花括号内也要加空格 —— { 后和 } 前都需要空格。
    'comma-spacing': 'error', // , 前不要空格， , 后需要空格。
    'func-call-spacing': 'error', // 调用函数时，函数名和小括号之间不要空格。
    'key-spacing': 'error', // 在对象的字面量属性中， key value 之间要有空格。
    'object-shorthand': 'error', // 用属性值缩写
    'quote-props': ["error", "as-needed"] // 只对那些无效的标示使用引号 ''
  },
};
