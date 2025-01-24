import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.content}>
        <NavLink to="/" style={styles.logo}>
          Lenz Crypto
        </NavLink>
        <div style={styles.links}>
          <NavLink 
            to="/precos" 
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.activeLink : {})
            })}
          >
            Preços
          </NavLink>
          <NavLink 
            to="/portfolios" 
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.activeLink : {})
            })}
          >
            Portfolios
          </NavLink>
          <NavLink 
            to="/register" 
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.activeLink : {})
            })}
          >
            Register
          </NavLink>
          <NavLink 
            to="/login" 
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.activeLink : {})
            })}
          >
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#1a1a1a',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)', 
    padding: '1rem',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#00ff88', 
  },
  links: {
    display: 'flex',
    gap: '1.5rem', 
  },
  link: {
    textDecoration: 'none',
    color: '#b3b3b3',
    padding: '0.5rem',
    transition: 'color 0.3s ease', 
  },
  activeLink: {
    color: '#00ff88', 
    fontWeight: '500',
    borderBottom: '2px solid #00ff88', 
  },
};

export default Navbar;