import React, { useState, useEffect } from 'react';
import styles from './Sidebar.module.scss';

interface SidebarProps {
    items: (string | React.ReactNode)[]; 
    onItemClick: (index: number) => void; 
    selectedIndex: number | null; 
}

const Sidebar: React.FC<SidebarProps> = ({ items, onItemClick, selectedIndex }) => {
    const [selectedItem, setSelectedItem] = useState<number | null>(selectedIndex);

    useEffect(() => {
        setSelectedItem(selectedIndex);
    }, [selectedIndex]);

    const handleItemClick = (index: number) => {
        setSelectedItem(index);
        onItemClick(index); 
    };

    return (
        <div className={styles.sidebar}>
            <h2 className={styles.title}>Gerico</h2>
            <ul className={styles.menu}>
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={`${styles.menuItem} ${selectedItem === index ? styles.selected : ''}`}
                        onClick={() => handleItemClick(index)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
