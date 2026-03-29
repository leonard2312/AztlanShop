import React, { useState } from "react";
import "./AuthContainer.css";

// Hooks base (esqueleto)
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

  return (
    <div className="auth-container">
      <div className={`auth-card ${isLogin ? "login" : "register"}`}>

        {/* SLIDER */}
        <div className="slider">
          <div className="slider-content">
            {isLogin ? (
              <>
                <h2>Bienvenido</h2>
                <p>Inicia sesión para continuar</p>
                <button onClick={() => setIsLogin(false)}>
                  Ir a registro
                </button>
              </>
            ) : (
              <>
                <h2>Nuevo aquí</h2>
                <p>Crea una cuenta</p>
                <button onClick={() => setIsLogin(true)}>
                  Ir a login
                </button>
              </>
            )}
          </div>
        </div>

        {/* LOGIN */}
        <div className="form-container login-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              trackLogin();
              login();
            }}
          >
            <h2>Login</h2>
            <input type="email" placeholder="Correo" required />
            <input type="password" placeholder="Contraseña" required />

            <button className="primary">Entrar</button>

            <span className="divider">o</span>

            <button type="button" className="google">
              Continuar con Google
            </button>
          </form>
        </div>

        {/* REGISTER */}
        <div className="form-container register-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              trackRegister();
              register();
            }}
          >
            <h2>Registro</h2>
            <input type="text" placeholder="Nombre" required />
            <input type="email" placeholder="Correo" required />
            <input type="password" placeholder="Contraseña" required />

            <button className="primary">Crear cuenta</button>

            <span className="divider">o</span>

            <button type="button" className="google">
              Registrarse con Google
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AuthContainer;