import React, { useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AuthLogin from '../authService/AuthLogin';
import "./AuthContainer.css";

export const useAuthGraphQL = () => {
  const login = async () => Promise.resolve();
  const register = async () => Promise.resolve();
  return { login, register };
};

export const useAuthMetrics = () => {
  const trackLogin = () => console.log("login metric");
  const trackRegister = () => console.log("register metric");
  return { trackLogin, trackRegister };
};

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuthGraphQL();
  const { trackLogin, trackRegister } = useAuthMetrics();
  const [username,setUser] = useState('');
  const [email,setEmail] = useState('');
  const [pass,setPass] = useState('');

  function submitLogin(){
    AuthLogin(username,pass);
  }

  return (
    <div className="auth-container">
      <div className={`auth-card ${isLogin ? "login" : "register"}`}>

        <div className="slider">
          <div className="slider-content">
            {isLogin ? (
              <>
                <h2>Welcome</h2>
                <p>Login to continue</p>
                <button onClick={() => setIsLogin(false)}>
                  Go to Login
                </button>
              </>
            ) : (
              <>
                <h2>New here</h2>
                <p>Crete an account</p>
                <button onClick={() => setIsLogin(true)}>
                  Go to Register
                </button>
              </>
            )}
          </div>
        </div>

        <div className="form-container login-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              trackLogin();
              login();
            }}
          >
            <h2>Login</h2>
            <input type="username" placeholder="User" required 
            onChange={e => setUser(e.target.value)}/>
            <input type="password" placeholder="Contraseña" required 
            onChange={e => setPass(e.target.value)}/>

            <button className="primary" 
            onSubmit={submitLogin()}>Continue</button>

            <span className="divider">o</span>

            <button type="button" className="google">
              Continue with Google
              <img src="/images/google.png" alt="" />
            </button>
          </form>
        </div>

        <div className="form-container register-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              trackRegister();
              register();
            }}
          >
            <h2>Register</h2>
            <input type="text" placeholder="Nombre" required />
            <input type="email" placeholder="Correo" required />
            <input type="password" placeholder="Contraseña" required />

            <button className="primary">Create account</button>

            <span className="divider">o</span>

            <button type="button" className="google">
              Register with Google
              <img src="/images/google.png" alt="" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AuthContainer;