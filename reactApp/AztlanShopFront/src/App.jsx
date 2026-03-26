import PillNav from './explore/PillNav';
import { BrowserRouter } from 'react-router-dom'
const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
      <PillNav
        logo={"/logo.png"}
        logoAlt="Company Logo"
        items={[
          { label: 'Inicio', href: '/' },
  { 
    label: 'Proyectos', 
    href: '/proyectos', 
    submenu: [
      { label: 'Web Design', href: '/web' },
      { label: 'Mobile Apps', href: '/mobile' }
    ] 
  },
  { label: 'Contacto', href: '/contacto' }
        ]}
        activeHref="/"
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
        theme="light"
        initialLoadAnimation={false}
      />
      </BrowserRouter>
      <main style={{ marginTop: '100px', padding: '20px' }}>
        <h1>Bienvenido a Aztlan Shop</h1>
        <p>Explora nuestra arquitectura y proyectos.</p>
      </main>
    </div>
  );
};

export default App;