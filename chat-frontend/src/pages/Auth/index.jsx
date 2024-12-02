import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginForm, RegisterForm } from 'modules';
import "./Auth.scss";

const Auth = () => (
    <section className = "auth">
        <div className="auth__content">
            <Routes>
                <Route exact path="/login" element={<LoginForm />} />
                <Route exact path="/register" element={<RegisterForm />} />
                
            </Routes>
        </div>
    </section>
);

export default Auth;