const darkTheme = require('@ant-design/dark-theme');

module.exports = {
    port: 3000,
    localhost: '127.0.0.1',
    theme: darkTheme.default,
    public: 'public',
    consoleColor: {
        silly: 'rainbow',
        input: 'grey',
        verbose: 'cyan',
        prompt: 'grey',
        info: 'green',
        data: 'grey',
        help: 'cyan',
        warn: 'yellow',
        debug: 'blue',
        error: 'red'
    }
};