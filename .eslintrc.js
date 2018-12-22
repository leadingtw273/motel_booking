module.exports = {
    root: true,
    env: {
        node: '>= 8.0.0',
        browser: true
    },
    globals: {
        process: false
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    },
    extends: ['plugin:vue/essential', '@vue/prettier'],
    plugins: ['vue', 'prettier'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
