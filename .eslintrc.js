module.exports = {
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    parser: 'babel-eslint',
    env: {
        es6: true,
        browser: true,
        node: true
    },
    rules: {
        'semi': ['error', 'always'], // 【强制】分号结尾
        'no-console': 0, // 【无要求】对是否有console无要求。
        'comma-dangle': 0, // 【无要求】对末尾是否能有逗号无要求。
        'no-useless-constructor': 0,
        'import/no-webpack-loader-syntax': 0,
        'no-extend-native': 0, // 可扩展原生类型
        'camelcase': 0, // 可以不是驼峰
        'jsx-quotes': 0,
        'no-unused-vars': 1,
        'react/prop-types': 0,
        indent: ['error', 4, { SwitchCase: 1 }],
        'standard/computed-property-even-spacing': 0,
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always'
            }
        ]
    }
};