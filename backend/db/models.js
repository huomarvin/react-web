const Sequelize = require('sequelize');
const Model = Sequelize.Model;
class User extends Model { }

const generateUser = (sequelize) => {
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
    })
};
module.exports = { User, generateUser };