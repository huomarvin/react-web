import React from 'react';
import { Select, Form, DatePicker, Input, Checkbox } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
export default {
    getOptionList(data) {
        if (!data) {
            return [];
        }
        const options = []; // [<Option value="0" key="all_key">全部</Option>];
        data.map(item => {
            options.push(
                <Option value={item.id} key={item.id}>
                    {item.name}
                </Option>
            );
        });
        return options;
    },
    genereateFormItem(form, formList) {
        const { getFieldDecorator } = form;
        const formItemList = [];
        if (formList && formList.length > 0) {
            formList.forEach((item, i) => {
                let { label, field, initialValue = '', placeholder, width, rules = [], required } = item;
                if (required) {
                    rules.push({
                        required: true,
                        message: `请输入${label}`
                    });
                }
                if (item.type === '时间查询') {
                    const begin_time = (
                        <FormItem label="订单时间" key={field}>
                            {getFieldDecorator('begin_time',
                                { rules }
                            )(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                            )}
                        </FormItem>
                    );
                    formItemList.push(begin_time);
                    const end_time = (
                        <FormItem label="~" colon={false} key={field}>
                            {getFieldDecorator('end_time')(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                            )}
                        </FormItem>
                    );
                    formItemList.push(end_time);
                } else if (item.type === 'INPUT') {
                    const INPUT = (
                        <FormItem label={label} key={field}>
                            {getFieldDecorator([field], {
                                rules,
                                initialValue: initialValue
                            })(<Input type="text" placeholder={placeholder} />)}
                        </FormItem>
                    );
                    formItemList.push(INPUT);
                } else if (item.type === 'SELECT') {
                    const SELECT = (
                        <FormItem label={label} key={field}>
                            {getFieldDecorator([field], {
                                rules,
                                initialValue: initialValue
                            })(
                                <Select style={{ width: width }} placeholder={placeholder}>
                                    {this.getOptionList(item.list)}
                                </Select>
                            )}
                        </FormItem>
                    );
                    formItemList.push(SELECT);
                } else if (item.type === 'CHECKBOX') {
                    const CHECKBOX = (
                        <FormItem label={label} key={field}>
                            {getFieldDecorator([field], {
                                valuePropName: 'checked',
                                initialValue: initialValue //true | false
                            })(<Checkbox>{label}</Checkbox>)}
                        </FormItem>
                    );
                    formItemList.push(CHECKBOX);
                }
            });
        }
        return formItemList;
    }
};
