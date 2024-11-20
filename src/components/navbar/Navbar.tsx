import React from 'react';
import { FaArrowLeft } from 'react-icons/fa'; 
import styles from './Navbar.module.scss'; 

interface NavbarProps {
  isDashboard: boolean; 
}

const Navbar: React.FC<NavbarProps> = ({ isDashboard }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        {isDashboard ? (
          <a href="/" className={styles.backLink} aria-label="Retour au tableau de bord">
            <FaArrowLeft className={styles.icon} /> Retour au tableau de bord
          </a>
        ) : (
          <a href="/" className={styles.link}>Gerico</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
