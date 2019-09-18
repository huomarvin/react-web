import React from 'react';
import { Select } from 'antd';

const { Option } = Select;
export default {
    pagination(data, callback) {
        return {
            onChange: current => {
                callback(current);
            },
            current: data.value.pageNumber,
            pageSize: data.value.pageSize,
            total: data.value.total,
            // showTotal: () => `共${data.result.total_count}条`,
            showQuickJumper: true
        };
    },
    // 隐藏手机号中间4位
    formatPhone(phone) {
        phone += '';
        return phone.replace(/(\d{3})\d*(\d{4})/g, '$1***$2');
    },
    // 隐藏身份证号中11位
    formatIdentity(number) {
        number += '';
        return number.replace(/(\d{3})\d*(\d{4})/g, '$1***********$2');
    },
    /**
     * ETable 行点击通用函数
     * @param {*选中行的索引} selectedRowKeys
     * @param {*选中行对象} selectedItem
     */
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
        if (selectedIds) {
            this.setState({
                selectedRowKeys,
                selectedIds,
                selectedItem: selectedRows
            });
        } else {
            this.setState({
                selectedRowKeys,
                selectedItem: selectedRows
            });
        }
    }
};
