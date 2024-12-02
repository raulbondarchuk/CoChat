import React, { useState } from "react";
import { Form } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined, ReloadOutlined, InfoCircleTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { Button, Block, FormField } from 'components';
import logo from './../../../img/logo.png';
import "./Register.scss";

const success = false; // Estado (Registrado correctamente/No registrado)


const RegisterForm = ({ success, values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => {

    return (
        <div>
            { !success ? 
            (<div className="auth__content">
                <div className="auth__top">
                    <h2>Registra nueva cuenta</h2>
                    <p>Por favor, introduzca los datos</p>
                </div>
            </div>) : 
            (<div className="auth__content">
                <div className="auth__top">
                    <h2>Confirmación de la cuenta</h2>
                    <p>Los datos fueron enviados con exito</p>
                </div>
            </div>)}
            <Block>
                
                { !success ? (
                    
                    <Form onSubmit={handleSubmit} className="login-form" >
                        <img src={logo} alt="Logo" className="logo" /> {/* LOGO */}
                        <FormField 
                            name="email" 
                            placeholder="E-Mail" 
                            icon={MailOutlined} 
                            touched={touched} 
                            errors={errors} 
                            values={values} 
                            handleChange={handleChange} 
                            handleBlur={handleBlur} 
                        />
                        
                        <FormField 
                            name="username" 
                            placeholder="Su nombre y apellido" 
                            icon={UserOutlined} 
                            touched={touched} 
                            errors={errors} 
                            values={values} 
                            handleChange={handleChange} 
                            handleBlur={handleBlur} 
                        />
                        
                        <FormField 
                            name="password" 
                            placeholder="Su contraseña" 
                            icon={LockOutlined} 
                            touched={touched} 
                            errors={errors} 
                            values={values} 
                            handleChange={handleChange} 
                            handleBlur={handleBlur} 
                        />
                        <FormField 
                            name="password2" 
                            placeholder="Repite su contraseña" 
                            icon={ReloadOutlined} 
                            touched={touched} 
                            errors={errors} 
                            values={values} 
                            handleChange={handleChange} 
                            handleBlur={handleBlur} 
                        />
                        
                        <Form.Item>
                            <Button 
                                type="primary" 
                                onClick={handleSubmit} 
                                className="login-form-button" 
                                size="large" 
                                disabled={isSubmitting}>
                                    Registrar nueva cuenta
                            </Button>

                        </Form.Item>
                        
                        <Link className="auth__register-link" to="/">Acceder a una cuenta</Link>
                    </Form>
                ) : 
                <div className="auth__success-block">
                    <div>
                        <img src={logo} alt="Logo" className="logo1" /> {/* LOGO */}
                    </div>
                    
                    <div>
                        <InfoCircleTwoTone style={{ fontSize: '50px' }} />
                    </div>
                        <h2>Confirmación</h2>
                        <p>
                            Se ha enviado un mensaje de confirmación de registro al departamento de la administración. 
                            Cuando la administración confirme su cuenta, se enviará una respuesta a su correo electrónico.
                        </p>
                        
                        <Link className="auth__register-link" to="/"><h2>Acceder a una cuenta</h2></Link>
                </div>
                    
                    
                        
                }
            </Block>
        </div>
    )        
};

export default RegisterForm;