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

                    <div className={styles.content}>

        
            <div className={styles.header}>
                <div>Mon compte</div>
            </div>
            <div className={styles.subheader}>
                <div>Mes informations</div>
            </div>
                {data ? (
                    
                    <div>
                         <div className={styles.PasswordSection}>
                            <Input
                            type="text"
                            id="username"
                            label="Mot de passe"
                            placeholder="********"
                            onChange={handlechange}
                            required
                            />
                            <Input
                            type="text"
                            id="username"
                            label="Confirmation du mot de passe"
                            placeholder="********"
                            onChange={handlechange}
                            required
                            />
                        </div>
                        <Input
                        type="text"
                        id="username"
                        label="Adresse email"
                        value={data.email}
                        disabled={true} 
                        />
                        <Input
                        type="text"
                        id="username"
                        label="Nom et prénom"
                        value={data.first_name + " " + data.last_name}
                        disabled={true}  
                        />
                        <Input
                        type="text"
                        id="username"
                        label="Poste"
                        value={data.position}
                        disabled={true}  
                        />
                        <Input
                        type="text"
                        id="username"
                        label="Date d'embauche:"
                        value={new Date(data.hire_date).toLocaleDateString()}
                        disabled={true}  
                        />
                    </div>
                ) : (
                    <p>Chargement...</p>
                )}
            </div>
            </div>
    );
};

export default Account;
