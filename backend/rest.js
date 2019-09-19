const { createUser, getUserList, updateUser, deleteUser } = require('./db/dao');

module.exports = {
    "/getUserList": async (data) => {
        let { pageSize = 10, pageNumber = 1, name } = data;
        pageSize = parseInt(pageSize);
        pageNumber = parseInt(pageNumber);
        let customers = await getUserList({
            name,
            offset: (pageNumber - 1) * pageSize,
            limit: pageSize
        });
        return {
            success: true,
            value: {
                pageSize,
                pageNumber,
                total: customers.count || customers.counts,
                data: customers.rows
            }
        };
    },
    "/addUser": async (param) => {
        await createUser(param);
        return {
            success: true,
        }
    },
    "/updateUser/:id": async (id, param) => {
        let data = await updateUser(id, param);
        return {
            success: true,
            data
        }
    },
    "/deleteUser/:id": async (id) => {
        let data = await deleteUser(id);
        return {
            success: !!data,
            data
        }
    }
}