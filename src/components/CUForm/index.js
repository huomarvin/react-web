import React from 'react';
import { Select, Form, Button } from 'antd';
import UIUtils from '../../utils/ui';
const FormItem = Form.Item;

class CUForm extends React.Component {
    componentDidMount() {
        const { loadData, form: { setFieldsValue } } = this.props;
        if (loadData) {
            loadData(setFieldsValue);
        }
    }

    handleFilterSubmit = () => {
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                console.log('Received values of form: ', fieldsValue);
                this.props.filterSubmit(fieldsValue);
            }
        });
    };

    reset = () => {
        this.props.form.resetFields();
    };

    initFormList = () => {
        const { form, formList } = this.props;
        return UIUtils.genereateFormItem(form, formList);
    };
    render() {
        return (
            <Form layout="horizontal">
                {this.initFormList()}
                <FormItem style={{ marginTop: 20 }}>
                    <Button type="primary" onClick={this.handleFilterSubmit}>
                        提交
                    </Button>
                    <Button onClick={this.reset} style={{ marginLeft: 20 }}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
export default Form.create({})(CUForm);
