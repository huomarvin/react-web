const menuList = [
    {
        title: '首页',
        key: '/home'
    },
    {
        title: 'UI',
        key: '/ui',
        children: [
            {
                title: '按钮',
                key: '/ui/buttons'
            },
            {
                title: '弹框',
                key: '/ui/modals'
            },
            {
                title: 'Loading',
                key: '/ui/loadings'
            },
            {
                title: '通知提醒',
                key: '/ui/notification'
            },
            {
                title: '全局Message',
                key: '/ui/messages'
            },
            {
                title: 'Tab页签',
                key: '/ui/tabs'
            }
        ]
    },
    {
        title: '用户管理',
        key: '/user'
    },
    {
        title: '角色管理',
        key: '/role'
    },
    {
        title: '资源管理',
        key: '/resource'
    }
];
export default menuList;
