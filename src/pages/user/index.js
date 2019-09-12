import React, { Component } from 'react';
import { Card, Button, Table, Form, Select, Modal, DatePicker, message } from 'antd';
import request from '@src/request';
import BaseForm from '../../components/BaseForm'
const FormItem = Form.Item;
const Option = Select.Option;

class User extends Component {
    state = {
        orderInfo: {},
        orderConfirmVisble: false
    }
    params = {
        page: 1
    }
    formList = [
        {
            type: 'INPUT',
            label: '用户名',
            field: 'userName',
        },
        {
            type: 'SELECT',
            label: '角色名称',
            field: 'roleName',
            placeholder: '全部',
            initialValue: '1',
            width: 80,
            list: [{ id: '0', name: '管理员' }, { id: '1', name: '角色1' }, { id: '2', name: '角色2' }]
        },
        {
            type: 'INPUT',
            label: 'Email',
            field: 'email',
        },
    ]
    componentDidMount() {
        this.requestList()
    }

    handleFilter = (params) => {
        this.params = params;
        this.requestList();
    }
    requestList = () => {
        let _this = this;
        request.getUserList().then(res => {
            this.setState({
                list: res.value.data
            });
        })
        // axios.ajax({
        //     url: '/order/list',
        //     data: {
        //         params: this.params
        //     }
        // }).then((res) => {
        //     let list = res.result.item_list.map((item, index) => {
        //         item.key = index;
        //         return item;
        //     });
        //     this.setState({
        //         list,
        //         pagination: Utils.pagination(res, (current) => {
        //             _this.params.page = current;
        //             _this.requestList();
        //         })
        //     })
        // })
    }

    onRowClick = (record, index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }
    render() {
        const columns = [
            {
                title: '用户ID',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'name'
            },
            {
                title: '手机号',
                dataIndex: 'phone'
            },
            {
                title: '邮箱',
                dataIndex: 'email'
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: (text) => {
                    return text === 1 ? '正常' : '禁用';
                }
            },
            {
                title: '上次登录时间',
                dataIndex: 'lastLoginTime'
            }
        ]
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary">用户新增</Button>
                    <Button type="primary" style={{ marginLeft: 10 }}>用户编辑</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                    />
                </div>
            </div>
        );
    }
}

User.propTypes = {

};

export default User;