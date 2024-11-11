import Dashboard from '../dashboard/dashboard';
import { useState, useEffect } from 'react';
import styles from './account.module.scss';
import { fetchAccountInfo } from '../../services/api';
import Input from '../../components/input/Input';

const Account: React.FC = () => {
    const [data, setData] = useState<any>(null);

    const handlechange = () => {
        
        console.log("bip");
    }

    useEffect(() => {
        const loadAccountInfo = async () => {
            try {
                const response = await fetchAccountInfo();
                setData(response); 
                console.log(response); 
            } catch (error) {
                console.error('Erreur lors de la récupération des informations', error);
            }
        };

        loadAccountInfo();
    }, []);

    return (
        <div className={styles.container}>
            <Dashboard />
            {data ? (
                
            
                <div>
                <Input
                type="text"
                id="username"
                label="Adresse mail"
                value={data.email}
                onChange={handlechange}
                required
                disabled={true} 
                />
                <Input
                type="text"
                id="username"
                label="Nom"
                value={data.email}
                onChange={handlechange}
                required
                disabled={true}  
                />

                    <div>Position: {data.position}</div>
                    <div>Salaire: {data.salary}</div>
                    <div>Date d\'embauche: {new Date(data.hire_date).toLocaleDateString()}</div>
                </div>
            ) : (
                <p>Chargement...</p>
            )}
        </div>
    );
};

export default Account;
