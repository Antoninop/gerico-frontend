import React, { useState, useEffect } from 'react';
import styles from './Sidebar.module.scss';
import { AiFillTruck } from "react-icons/ai";

interface SidebarProps {
    items: (string | React.ReactNode)[]; 
    onItemClick: (index: number) => void; 
    selectedIndex: number | null; 
    bottomContent?: React.ReactNode; 
}

const Sidebar: React.FC<SidebarProps> = ({ items, onItemClick, selectedIndex, bottomContent }) => {
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
            <div>
                <div className={styles.grouptitle}>
                    <h2 className={styles.title}> <AiFillTruck /> Gerico</h2>
                    <h3>intranet</h3>
                </div>
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
            {bottomContent && <div className={styles.bottomContent}>{bottomContent}</div>}
        </div>
    );
};

export default Sidebar;
