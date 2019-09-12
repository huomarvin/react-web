import Axios from '@utils/axios';

// 不需要mock的时候将baseURL置空
const baseURL = 'http://localhost:3001';

export default class Request {
    static getUserList(data) {
        return Axios.ajax({
            baseURL,
            url: '/getUserList',
            method: 'get',
        });
    }
};