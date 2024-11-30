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
    const { logout, user, loading } = useAuth();

    const handleLogout = () => {
        logout();
    };

    // Vérifiez si l'utilisateur est en train de se charger
    if (loading) {
        console.log("Loading user data..."); // Debugging: vérifier si on est en mode de chargement
        return <div>Loading...</div>;
    }

    console.log("User data: ", user); // Debugging: afficher les données utilisateur
    const isAdmin = user?.isAdmin;
    console.log("Is user admin? ", isAdmin); // Vérifier si isAdmin est bien défini

    const items = [
        { label: <><IoDocument /> Mes fiches de paie</>, route: '/fiches-paie' },
        { label: <><IoAirplane /> Gérer mes congés</>, route: '/conges' },
        { label: <><IoPerson /> Mon compte</>, route: '/compte' },
        ...(isAdmin ? [{ label: <><IoBuildSharp /> Administration</>, route: '/administration' }] : []),
    ];

    useEffect(() => {
        console.log("current user: ", user); // Debugging
        const currentRoute = location.pathname;
        const selectedIndex = items.findIndex(item => item.route === currentRoute);
        setSelectedItem(selectedIndex !== -1 ? selectedIndex : null);
    }, [location.pathname, user]); // Ajoutez 'user' dans les dépendances pour re-render lors de la mise à jour

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
