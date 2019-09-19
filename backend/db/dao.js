const { User } = require('./models');
const { Op } = require('sequelize');

// 创建用户
const createUser = async (data) => {
    return await User.create(data);
}
// 分页
const getUserList = async (data) => {
    let where = {};
    let page = {};
    let { name, offset, limit } = data;
    if (name) {
        where['name'] = {
            [Op.like]: `%${name}%`
        };
    }
    if (offset && limit) {
        page.offset = offset;
        page.limit = limit;
    }
    return User.findAndCountAll({
        attributes: ['id', 'name', 'email', 'phone', 'createdAt', 'updatedAt'],
        order: [
            ['updatedAt', 'DESC']
        ],
        where, ...page
    })
}
// 通过用户名查询列表
const getUserListByName = async (name) => {
    return User.findAll({
        where: {
            name: {
                [Op.like]: `${name}%`
            }
        }
    });
}
// 通过id查询用户信息
const getUserById = async (id) => {
    return User.findByPk(id)
}

const updateUser = async (id, user) => {
    const item = await getUserById(id);
    if (item) {
        return item.update(user);
    } else {
        throw new Error(`the user with id ${id} is not exist`);
    }
}

const deleteUser = async (id) => {
    const item = await getUserById(id);
    if (item) {
        return item.destroy();
    }
}

module.exports = { createUser, getUserList, getUserListByName, getUserById, updateUser, deleteUser };