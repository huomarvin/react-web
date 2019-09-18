import React from 'react';
import { Row, Col } from 'antd';
import './index.less';
import { connect } from 'react-redux';
class Header extends React.Component {
    state = {};
    UNSAFE_componentWillMount() {
        this.setState({
            userName: 'Bernie'
        });
    }

    render() {
        const { menuName, menuType } = this.props;
        return (
            <div className="header">
                <Row className="header-top">
                    {menuType ? (
                        <Col span={6} className="logo">
                            <img src="/assets/logo.png" alt="" />
                            <span>IMooc 通用管理系统</span>
                        </Col>
                    ) : (
                        ''
                    )}
                    <Col span={menuType ? 18 : 24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {menuType ? (
                    ''
                ) : (
                    <Row className="breadcrumb">
                        <Col span={4} className="breadcrumb-title">
                            {menuName || '首页'}
                        </Col>
                    </Row>
                )}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        menuName: state.menuName
    };
};
export default connect(mapStateToProps)(Header);
