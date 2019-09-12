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
        console.log('rest', data);
        let { pageSize = 10, pageNumber = 1 } = data;
        pageSize = parseInt(pageSize);
        pageNumber = parseInt(pageNumber);
        return {
            success: true,
            value: {
                pageSize,
                pageNumber,
                total: userList.length,
                data: userList.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
            }
        };
    },
    "/addUser": (data) => {
        userList.push({ ...data, id: userList.length + 1 });
        return {
            success: true
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