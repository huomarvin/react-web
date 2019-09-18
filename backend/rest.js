const faker = require('faker');
let userList = [];
for (let i = 1; i <= 100; i++) {
    userList.push({
        id: i,
        name: faker.name.firstName(),
        phone: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        email: faker.internet.email(),
        lastLoginTime: faker.date.past(),
        status: faker.random.number({ min: 1, max: 2 })
    });
}
module.exports = {
    "/getUserList": (data) => {
        let { pageSize = 10, pageNumber = 1, name } = data;
        pageSize = parseInt(pageSize);
        pageNumber = parseInt(pageNumber);
        let filterList = userList;
        if (name) {
            filterList = filterList.filter(item => item.name === name);
        }
        return {
            success: true,
            value: {
                pageSize,
                pageNumber,
                total: filterList.length,
                data: filterList.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
            }
        };
    },
    "/addUser": (param) => {
        console.log('param', param)
        let data = { ...param, id: userList.length + 1 };
        userList.push(data);
        return {
            success: true,
            data
        }
    },
    "/updateUser/:id": (id, param) => {
        let data = {};
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].id === parseInt(id)) {
                len = i;
                data = { ...userList[i], ...param };
                break;
            }
        }
        if (len != -1) {
            userList.splice(len, 1, data);
        }
        return {
            success: len != -1,
            data
        }
    },
    "/deleteUser/:id": (id) => {
        let len = -1;
        let data = {};
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].id === parseInt(id)) {
                len = i;
                break;
            }
        }
        if (len != -1) {
            data = userList.splice(len, 1);
        }
        return {
            success: true,
            data
        }
    },
    "/getUserInfo": {
        "data": {
            name: faker.name.firstName()
        }
    }
}