import CardNav from './explore/CardNav';

const NAV_ITEMS = [
  {
    label: "About",
    bgColor: "#0D0716",
    textColor: "#fff",
    links: [
      { label: "Company", ariaLabel: "About Company" },
      { label: "Careers", ariaLabel: "About Careers" }
    ]
  },
  {
    label: "Projects", 
    bgColor: "#170D27",
    textColor: "#fff",
    links: [
      { label: "Featured", ariaLabel: "Featured Projects" },
      { label: "Case Studies", ariaLabel: "Project Case Studies" }
    ]
  },
  {
    label: "Contact",
    bgColor: "#271E37", 
    textColor: "#fff",
    links: [
      { label: "Email", ariaLabel: "Email us" },
      { label: "Twitter", ariaLabel: "Twitter" },
      { label: "LinkedIn", ariaLabel: "LinkedIn" }
    ]
  }
];

const THEME_CONFIG = {
  baseColor: "#fff",
  menuColor: "#000",
  buttonBgColor: "#111",
  buttonTextColor: "#fff",
  ease: "power3.out",
  theme: "light"
};

const App = () => {
  return (
    <div className="app-container">
      <CardNav
        logo="/logo.png"
        logoAlt="Aztlan Shop Logo"
        items={NAV_ITEMS}
        {...THEME_CONFIG}
      />
      
      <main style={{ marginTop: '100px', padding: '20px' }}>
        <h1>Bienvenido a Aztlan Shop</h1>
        <p>Explora nuestra arquitectura y proyectos.</p>
      </main>
    </div>
  );
};

export default App;