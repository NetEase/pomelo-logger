/**
 * Created by wangkm on 2019-3-15.
 * Email: 417079820@qq.com.
 */
module.exports = {
  'env': {
    'es6': true,
    'node': true,
    'browser': true,
    'commonjs': true,
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'root': true, //以当前目录为根目录
  'globals': {
    '__stack': true, //global
  },
  'rules': {
    'no-console': 0, //允许使用console
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1
      }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'brace-style': 'error', //大括号风格
    'block-spacing': 'error', //空格
    'for-direction': 'error', //禁止 for 循环出现方向错误的循环，比如 for (i = 0; i < 10; i--)
    'no-await-in-loop': 0, //禁止将 await 写在循环里，因为这样就无法同时发送多个异步请求了(@off 要求太严格了，有时需要在循环中写 await)
    'no-class-assign': 2, //禁止给类赋值
    'no-cond-assign': 2, //禁止在条件表达式中使用赋值语句
    'no-const-assign': 2, //禁止修改const声明的变量
    'no-constant-condition': 0, //@off 禁止在条件中使用常量表达式 if(true) if(1)
    'no-dupe-keys': 2, //在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-dupe-args': 2, //函数参数不能重复
    'no-duplicate-case': 2, //switch中的case标签不能重复
    'no-empty': 2, //块语句中的内容不能为空
    'no-empty-character-class': 2, //正则表达式中的[]内容不能为空
    'no-func-assign': 2, //禁止重复的函数声明
    'no-irregular-whitespace': 2, //不能有不规则的空格
    'no-loop-func': 1, //禁止在循环中使用函数（如果没有引用外部变量不形成闭包就可以）
    'no-multi-spaces': 1, //不能用多余的空格
    'no-mixed-spaces-and-tabs': [2, false], //禁止混用tab和空格
    'no-multiple-empty-lines': [1, {'max': 2}], //空行最多不能超过2行
    'no-spaced-func': 2, //函数调用时 函数名与()之间不能有空格
    'no-trailing-spaces': 1, //一行结束后面不要有空格
    'no-this-before-super': 0, //在调用super()之前不能使用this或super
    'no-throw-literal': 2, //禁止抛出字面量错误 throw "error";
    'no-undef': 2, //不能有未定义的变量
    'no-unused-vars': 1, //该规则旨在消除未使用的变量，函数和函数的参数
    'no-var': 0, //禁用var，用let和const代替
    'no-with': 2, //禁用with
    'array-bracket-spacing': [2, 'never'], //是否允许非空数组里面有多余的空格
    'arrow-parens': 0, //箭头函数用小括号括起来
    'arrow-spacing': 0, //=>的前/后括号
    'accessor-pairs': 0, //在对象中使用getter/setter
    'camelcase': 1, //驼峰法命名
    'comma-style': [2, 'last'], //逗号风格，换行时在行首还是行尾
    'complexity': [0, 15], //循环复杂度brace-style
    'curly': [2, 'all'], //必须使用 if(){} 中的{}
    'default-case': 2, //switch语句最后必须有default
    'max-depth': ['error', 4], //嵌套深度
    'id-length': [1, {'min': 1, 'max': 30}], //变量名长度
    'valid-jsdoc': 0, //jsdoc规则
    'key-spacing': 2, //键名和键值之间要有空格。
    'keyword-spacing': [2, {'before': true, 'after': true}], //此规则强制执行围绕关键字和关键字标记的一致空格
    'space-before-function-paren': 0, //函数前空格
    'space-before-blocks': 'error', //此规则将强化块之前的间距一致性。它只适用于不以新行开始的块
    'new-cap': 1, //构造函数的名字以大写字母开始。
    'comma-spacing': [2, {'before': false, 'after': true}], //,后添加空格
    'space-infix-ops': ['error', {'int32Hint': false}], //这条规则旨在确保中缀操作员周围有空间。
  }
};