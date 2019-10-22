const Sequelize = require('sequelize');
const Model = Sequelize.Model;
class User extends Model { }
class Role extends Model { }
class Resource extends Model { }
class RoleResource extends Model { }
const force = {
    force: true
};
const generate = (sequelize) => {
    User.init({
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phone: {
            type: Sequelize.STRING,
        },
        lastLoginTime: {
            type: Sequelize.DATE
        }
    }, {
        sequelize,
        modelName: 'user'
    });
    Role.init({
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        }
    }, {
        sequelize,
        modelName: 'role'
    });
    Resource.init({
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        }
    }, {
        sequelize,
        modelName: 'resource'
    });
    RoleResource.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        roleId: {
            type: Sequelize.INTEGER,
        },
        resourceId: {
            type: Sequelize.INTEGER,
        }
    }, { sequelize, modelName: 'role_resource' });
    Role.belongsToMany(Resource, {
        through: {
            model: RoleResource,
            unique: false,
        },
        foreignKey: 'roleId',
        constraints: false
    });
    Resource.belongsToMany(Role, {
        through: {
            model: RoleResource,
            unique: false
        },
        foreignKey: 'reourceId',
        constraints: false
    });
    User.hasOne(Role, {
        constraints: false,
    });
    Role.belongsTo(User);
    User.sync(force);
    Role.sync(force);
    Resource.sync(force);
    RoleResource.sync(force);
    // for (let i = 0; i < 100; i++) {
    //     User.create({ name: `John${i}`, email: `John${i}@qq.com` }).then(res => {
    //     });
    // }
    // for (let i = 0; i < 10; i++) {
    //     Role.create({ name: `Role${i}` });
    //     for (let j = 0; j < 10; j++) {
    //         Resource.create({ name: `Reource-${i}-${j}`, code: `${i}-${j}` });
    //     }
    // }
};

module.exports = generate;