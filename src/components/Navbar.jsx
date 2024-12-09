import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {}
        <div className="navbar-logo">Weather Fast</div>

        {}
        <ul className="navbar-links">
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
