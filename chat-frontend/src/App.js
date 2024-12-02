// App.jsx
import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { Home } from 'pages';
import { LoginForm, RegisterForm } from 'modules';

const App = ({ isAuth }) => {
  const navigate = useNavigate();
  
  
  useEffect(() => {
    
    if (isAuth && (window.location.pathname === '/login' 
    || window.location.pathname === '/register' 
    || window.location.pathname === '/register/confirm-user')) {
      navigate('/im', { replace: true });
    } else if(!isAuth 
      && window.location.pathname !== '/login' 
      && window.location.pathname !== '/register' 
      && window.location.pathname !== '/register/confirm-user'){
      navigate('/login', { replace: true });
    }
  }, [isAuth, navigate]);
  

  

  return (
    
    <div className="wrapper">
          <Routes>
            <Route path="/login" element={
              <section className="auth">
                <div className="auth__content">
                  <LoginForm />
                </div>
              </section>
            } />
            <Route path="/register" element={
              <section className="auth">
                <div className="auth__content">
                  <RegisterForm success={false} />
                </div>
              </section>
            } />

            <Route path="/register/confirm-user" element={
              <section className="auth">
                <div className="auth__content">
                  <RegisterForm success={true} />
                </div>
              </section>
            } />

            <Route path="/confirm-user" element={
              <section className="auth">
                <div className="auth__content">
                  
                </div>
              </section>
            } />

            <Route path="/im" element={<Home />} />
            <Route path="/dialog/:dialogId" element={<Home />} />

          </Routes>
    </div>
    
  );
}

export default connect(({ user }) => ({ isAuth: user.isAuth }))(App);
