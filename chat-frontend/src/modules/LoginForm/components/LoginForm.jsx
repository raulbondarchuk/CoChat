import React from "react";
import { Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Button, Block } from 'components';

import { validateField } from 'utils/helpers';

import logo from './../../../img/logo.png';

import "./Login.scss";

const LoginForm = props => {
    const {
        values, touched, errors,  handleChange, handleBlur, handleSubmit, isSubmitting
    } = props;

    return (
        <div>
            <div className="auth__content">
                <div className="auth__top">
                    <h2>Acceder a la cuenta</h2>
                    <p>Por favor, accede a su cuenta</p>
                </div>
            </div>
            <Block>
                <img src={logo} alt="Logo" className="logo" /> {/* LOGO */}
                <Form onSubmit={handleSubmit} className="login-form" >
                    <Form.Item 
                            validateStatus={ validateField("email", touched, errors)} hasFeedback
                            rules={[ { required: true},]}
                            help={touched.email && errors.email}
                            >
                        <Input name="email" value={values.email} onChange={handleChange} onBlur={handleBlur}
                        prefix={<MailOutlined className="site-form-item-icon" />} placeholder="E-Mail" size="large" />
                    </Form.Item>

                    <Form.Item 
                        validateStatus={validateField("password", touched, errors)} hasFeedback
                        help={touched.password && errors.password}
                        >
                        <Input 
                            name="password" 
                            value={values.password} 
                            onChange={handleChange} 
                            onBlur={handleBlur}
                            prefix={<LockOutlined className="site-form-item-icon" />} 
                            type="password" 
                            placeholder="Contraseña" 
                            size="large" 
                        />
                    </Form.Item>
                    
                    <Form.Item>
                            <Button 
                                type="primary" 
                                onClick={handleSubmit} 
                                className="login-form-button" 
                                size="large" 
                                disabled={isSubmitting}>
                                    Acceder a la cuenta
                            </Button>
                        
                        </Form.Item>
                    <Link className="auth__register-link" to="/register">Registrarse</Link>
                </Form>
            </Block>
        </div>
        
    )        
}


export default LoginForm;