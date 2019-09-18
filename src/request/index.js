import Axios from '@utils/axios';

// 不需要mock的时候将baseURL置空 通过node做转发即可
const baseURL = 'http://localhost:3001';

export default class Request {
    static getUserList(data) {
        return Axios.ajax({
            baseURL,
            url: '/getUserList',
            method: 'get',
            data
        });
    }
    static deleteUser(id) {
        return Axios.ajax({
            baseURL,
            url: `/deleteUser/${id}`,
            method: 'delete',
        });
    }
    static addUser(params) {
        return Axios.ajax({
            baseURL,
            url: `/addUser`,
            method: 'post',
            data: {
                params
            }
        });
    }
    static updateUser(id, params) {
        return Axios.ajax({
            baseURL,
            url: `/updateUser/${id}`,
            method: 'put',
            data: {
                params
            }
        });
    }
};