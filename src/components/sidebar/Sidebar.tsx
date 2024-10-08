import React from 'react';
import styles from './Sidebar.module.scss';

interface SidebarProps {
    items: (string | React.ReactNode)[]; 
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
    return (
        <div className={styles.sidebar}>
            <h2 className={styles.title}>Gerico</h2>
            <ul className={styles.menu}>
                {items.map((item, index) => (
                    <li key={index} className={styles.menuItem}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
