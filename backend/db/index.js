const Sequelize = require('sequelize');
const config = require('../config');
const generate = require('./models');

const init = () => {
    const sequelize = new Sequelize(config.databaseName, config.userName, config.password, {
        host: config.host,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });

    sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
            generate(sequelize);
            // for (let i = 0; i < 100; i++) {
            //     User.create({ name: `John${i}`, email: `John${i}@qq.com` }).then(res => {
            //     });
            // }
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
}

module.exports = init;