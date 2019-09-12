import axios from 'axios';
import { Modal } from 'antd';

export default class Axios {
    static ajax(options) {
        console.log('options', options);
        let loading;
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        const baseApi = options.baseURL || '/';
        console.log('baseApi', baseApi);
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get' || options.method,
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then(response => {
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status === 200) {
                    const res = response.data;
                    if (res.success) {
                        resolve(res);
                    } else {
                        Modal.info({
                            title: '提示',
                            content: res.msg
                        });
                    }
                } else {
                    reject(response.data);
                }
            })
        }).catch(error => {
            console.error('error', error);
        });
    }
}
