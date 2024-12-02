import React, { useState } from 'react';
import { Form, Input, Button, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { validateField } from 'utils/helpers';

const FormField = ({ name, placeholder, icon: IconComponent, touched, errors, values, handleChange, handleBlur }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const isPasswordType = name.includes('password');

    return (
        <Form.Item
            validateStatus={validateField(name, touched, errors)}
            hasFeedback
            help={touched[name] && errors[name]}
        >
            <Input
                name={name}
                value={values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                prefix={<IconComponent className="site-form-item-icon" />}
                placeholder={placeholder}
                size="large"
                type={isPasswordType ? (showPassword ? 'text' : 'password') : 'text'}
                suffix={
                    isPasswordType ? (
                        <Space>
                            <Button
                                type="text"
                                icon={showPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                                onClick={togglePasswordVisibility}
                            />
                        </Space>
                    ) : null
                }
            />
        </Form.Item>
    );
};

export default FormField;
