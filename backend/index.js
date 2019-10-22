const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const rest = require('./rest');
const analysis = require('./analysis');
const initDb = require('./db');
const app = new Koa();
const router = new Router();
initDb();
app.use(bodyParser());
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', '*');
    ctx.set('Access-Control-Allow-Headers', 'content-type');
    ctx.set('Access-Control-Request-Headers', 'Origin, X-Requested-With, content-Type, Accept, Authorization');
    await next();
});

// 统一封装dao层抛出异常
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (ex) {
        ctx.body = {
            success: false,
            msg: ex.message
        }
    }
})

analysis(router, rest);

app.use(router.routes()).use(router.allowedMethods());
app.listen(3001, () => {
    console.log('后端3001接口监听成功');
});