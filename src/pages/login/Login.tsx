import React, { useState } from 'react';
import styles from './login.module.scss';
import Input from '../../components/input/Input'; 
import Navbar from '../../components/navbar/Navbar';
import { loginUser } from '../../services/api'; 

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);

        try {
            await loginUser(email, password);
            console.log('connecté'); 
        } catch (err: any) {
            console.error('Erreur de connexion:', err);
            setError(err.message); 
        }
    };

    return (
        <div>
            <Navbar />

            <div className={styles.loginContainer}>
                <div className={styles.Container}>
                    <h2>Connexion au portail employé</h2>
                    {error && <div className={styles.error}>{error}</div>} 
                    <form onSubmit={handleSubmit}>
                        <Input
                            type="email"
                            id="email"
                            label="Adresse email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            id="password"
                            label="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className={styles.submitButton}>Connexion à votre compte</button>
                        <div className={styles.passwordforgot}>Mot de passe oublié</div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
