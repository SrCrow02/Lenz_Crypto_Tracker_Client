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
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
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
    color: '#333',
  },
  links: {
    display: 'flex',
    gap: '1rem',
  },
  link: {
    textDecoration: 'none',
    color: '#666',
    padding: '0.5rem',
  },
  activeLink: {
    color: '#333',
    fontWeight: '500',
  },
};

export default Navbar;