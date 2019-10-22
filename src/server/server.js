const Koa = require('koa');
const webpack = require('webpack');
const colors = require('colors');
const convert = require('koa-convert');
const path = require('path');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const open = require('open');
const webpackConfig = require('../../webpack.config.js');
const config = require('../../config');
const app = new Koa();

colors.setTheme(config.consoleColor);

app.keys = ['keys', 'keykeys'];
app.use(session({
    store: redisStore({
        // Options specified here
    })
}));

app.use(require('koa-static')(path.resolve(__dirname, `../../${config.public}`), {}));

if (process.env.development) {
    const compiler = webpack(webpackConfig);
    app.use(
        require('koa-webpack-dev-middleware')(compiler, {
            noInfo: true,
            publicPath: webpackConfig.output.publicPath
        })
    );
    app.use(convert(require('koa-webpack-hot-middleware')(compiler)));
}

app.listen(config.port, () => {
    console.log(`${config.port}端口监听成功`);
    open(`${config.localhost}:${config.port}`)
});
