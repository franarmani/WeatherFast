import { useState } from 'react';
import './Navbar.css'; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">Weather Fast</div>

        {/* Botón hamburguesa */}
        <div className="navbar-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Enlaces del menú */}
        <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <li><a href="https://www.linkedin.com/in/franco-armani-993a36234/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href="https://www.instagram.com/fran.armani_/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a href="https://github.com/franarmani" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://samuraidesigns.framer.ai" target="_blank" rel="noopener noreferrer">Portfolio</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
