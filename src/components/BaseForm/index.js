import React from 'react';
import { Select, Form, Button } from 'antd';
import UIUtils from '../../utils/ui';
const FormItem = Form.Item;

class FilterForm extends React.Component {
    handleFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();
        let notNullValue = {};
        Object.keys(fieldsValue).forEach(item => {
            if (fieldsValue[item]) {
                notNullValue[item] = fieldsValue[item];
            }
        })
        this.props.filterSubmit(notNullValue);
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
            <Form layout="inline">
                {this.initFormList()}
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>
                        查询
                    </Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
export default Form.create({})(FilterForm);
