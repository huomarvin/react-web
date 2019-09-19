/**
 * 处理路由和api映射关系工具方法
 */

module.exports = (router, rest) => {
    Object.keys(rest).map(item => {
        console.log('item', item);
        if (item.startsWith('/get')) {
            router.get(item, async (ctx, next) => {
                ctx.body = await rest[item]({ ...ctx.request.query })
            })
        } else if (item.startsWith('/add') || item.startsWith('/save')) {
            router.post(item, async (ctx, next) => {
                ctx.body = await rest[item]({ ...ctx.request.body })
            })
        } else if (item.startsWith('/delete')) {
            router.del(item, async (ctx, next) => {
                ctx.body = await rest[item](ctx.params.id)
            })
        } else if (item.startsWith('/update')) {
            router.put(item, async (ctx, next) => {
                ctx.body = await rest[item](ctx.params.id, ctx.request.body)
            })
        }
    });
};