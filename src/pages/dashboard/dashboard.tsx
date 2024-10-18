import { IoDocument, IoAirplane, IoPerson, IoBuildSharp } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './dashboard.module.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { BiExit } from "react-icons/bi";
import { useAuth } from '../../services/AuthContext';


const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
      };

    const items = [
        { label: <><IoDocument /> Mes fiches de paie</>, route: '/fiches-paie' },
        { label: <><IoAirplane /> Gerer mes congés</>, route: '/conges' },
        { label: <><IoPerson /> Mon compte</>, route: '/compte' },
        { label: <><IoBuildSharp /> Administration</>, route: '/administration' }
    ];

    useEffect(() => {
        const currentRoute = location.pathname;
        const selectedIndex = items.findIndex(item => item.route === currentRoute);
        setSelectedItem(selectedIndex !== -1 ? selectedIndex : null);
    }, [location.pathname]); 

    const handleNavigate = (route: string) => {
        navigate(route);
    };

    return (
        <div className={styles.container}>
            <Sidebar 
                items={items.map(item => item.label)} 
                selectedIndex={selectedItem} 
                onItemClick={(index) => handleNavigate(items[index].route)} 
                bottomContent={<div className={styles.bottomContent} onClick={handleLogout}><BiExit/>Déconnexion</div>}
            />
        </div>
    );
};

export default Dashboard;
