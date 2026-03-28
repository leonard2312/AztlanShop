import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import PillNav from './explore/PillNav';
import AuthContainer from './authView/AuthContainer';

const NavigationWrapper = ({ navProps }) => {
  const location = useLocation();
  
  const hideNavbarPaths = ['/login', '/registro'];
  
  if (hideNavbarPaths.includes(location.pathname)) {
    return null;
  }

  return <PillNav {...navProps} activeHref={location.pathname} />;
};

const App = () => {
  const navSettings = {
    logo: "/logo.png",
    logoAlt: "Aztlan Shop Logo",
    items: [
      { label: 'Inicio', href: '/' },
      { 
        label: 'Proyectos', 
        href: '/proyectos', 
        submenu: [
          { label: 'Web Design', href: '/web' },
          { label: 'Mobile Apps', href: '/mobile' }
        ] 
      },
      { label: 'LogIn', href: '/login' }
    ],
    theme: "light",
    baseColor: "#000000",
    pillColor: "#ffffff",
  };

  return (
    <div className="app-container">
      <BrowserRouter>
        <NavigationWrapper navProps={navSettings} />

        <main style={{ marginTop: '20px', padding: '20px' }}>
          <Routes>
            <Route path="/" element={
              <div className="animate-fadeIn">
                <h1>Bienvenido a Aztlan Shop</h1>
                <p>Explora nuestra arquitectura y proyectos.</p>
              </div>
            } />
            
            <Route path="/login" element={<AuthContainer />} />
            <Route path="/proyectos" element={<div>Sección de Proyectos</div>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;