import React, { Component, Fragment } from 'react';
import { Card, Button, Table, Icon, Popconfirm, Drawer, message, Form } from 'antd';
import request from '@src/request';
import Utils from '@src/utils/utils';
import components from '@components';
const { BaseForm, CUForm } = components;

class User extends Component {

    state = { visible: false, viewVisible: false };

    onClose = (visible) => {
        this.setState({
            [visible]: false,
        });
    };

    params = {
        pageNumber: 1
    }

    formList = [
        {
            type: 'INPUT',
            label: '用户名',
            field: 'name',
        },
        // {
        //     type: 'SELECT',
        //     label: '角色名称',
        //     field: 'roleName',
        //     placeholder: '全部',
        //     initialValue: '1',
        //     width: 80,
        //     list: [{ id: '0', name: '管理员' }, { id: '1', name: '角色1' }, { id: '2', name: '角色2' }]
        // },
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
        request.getUserList({
            params: this.params
        }).then(res => {
            this.setState({
                list: res.value.data,
                pagination: Utils.pagination(res, (current) => {
                    _this.params.pageNumber = current;
                    _this.requestList();
                })
            });
        })
    }

    loadFirstPage = () => {
        this.params.pageNumber = 1;
        this.setState({
            visible: false
        });
        this.requestList();
    }

    addUser = () => {
        this.setState({
            title: '用户新增',
            visible: true,
            data: undefined
        });
    }

    deleteUser = (id, record) => {
        console.log('record', record);
        request.deleteUser(id).then(res => {
            console.log('res', res);
            message.success('删除成功!');
            this.requestList();
        })
    }

    editUser = (id, record) => {
        this.setState({
            title: '用户编辑',
            visible: true,
            data: record
        });
        console.log('record', record);
    }

    viewUser = (id, record) => {
        this.setState({
            viewVisible: true,
            data: record
        });
    }

    render() {
        const { title, visible, viewVisible, data } = this.state;
        const columns = [
            {
                title: '用户ID',
                dataIndex: 'id',
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
            },
            {
                title: 'Action',
                render: (text, record) => {
                    return <Fragment>
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteUser(record.id, record)}>
                            <Icon type="delete" />
                        </Popconfirm>
                        <Icon type="edit" style={{ marginLeft: 10 }} onClick={() => this.editUser(record.id, record)} />
                        <Icon type="eye" style={{ marginLeft: 10 }} onClick={() => this.viewUser(record.id, record)} />
                    </Fragment>
                }
            }
        ]
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.addUser}>用户新增</Button>
                    {/* <Button style={{ marginLeft: 10 }}>用户编辑</Button> */}
                    {/* <Button type="danger" style={{ marginLeft: 10 }}>用户删除</Button> */}
                </Card>
                <div className="content-wrap">
                    <Table
                        rowKey="id"
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Drawer title={title}
                    placement="right"
                    closable={false}
                    onClose={() => this.onClose('visible')}
                    visible={visible}
                    width={500}
                    destroyOnClose
                >
                    <WrappedUserEntity data={data} callback={this.loadFirstPage} />
                </Drawer>
                <Drawer title={'用户信息查看'}
                    placement="right"
                    closable={false}
                    onClose={() => this.onClose('viewVisible')}
                    visible={viewVisible}
                    width={500}
                    destroyOnClose
                >
                    <ViewUser data={data} />
                </Drawer>
            </div>
        );
    }
}



class ViewUser extends Component {
    render() {
        const { data } = this.props;
        console.log(data);
        return (
            <div>
                {
                    UserEntity.CUformList.map((item, index) => {
                        return <div key={index}>
                            <label>{item.label}</label>
                            <span>:</span>
                            <span>{data[item.field]}</span>
                        </div>
                    })
                }
            </div>
        );
    }
}

class UserEntity extends Component {
    static CUformList = [
        {
            type: 'INPUT',
            label: '用户名',
            field: 'name',
            required: true
        },
        {
            type: 'INPUT',
            label: '邮箱',
            field: 'email',
            required: true
        },
        {
            type: 'INPUT',
            label: '手机号',
            field: 'phone',
            required: true
        }
    ];
    componentDidMount() {
    }

    loadData = (setFieldsValue) => {
        const { data } = this.props;
        if (data) {
            setFieldsValue(data);
        }
    }

    handleFilter = (params) => {
        const { data, callback } = this.props;
        if (data && data.id) {
            request.updateUser(data.id, params).then(res => {
                if (res.success) {
                    message.success('更新成功');
                    callback();
                }
            });
        } else {
            request.addUser(params).then(res => {
                if (res.success) {
                    message.success('新增成功');
                    callback();
                }
            });
        }
    }

    render() {
        console.log('this.CUformList', this.CUformList);
        return <div>
            <CUForm loadData={this.loadData} formList={UserEntity.CUformList} filterSubmit={this.handleFilter} />
        </div>;
    }
}
const WrappedUserEntity = Form.create()(UserEntity);

User.propTypes = {

};

export default User;