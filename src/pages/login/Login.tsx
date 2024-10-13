import React, { useState } from 'react';
import styles from './login.module.scss';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/input/Input'; 
import Navbar from '../../components/navbar/Navbar';
import { loginUser } from '../../services/api';
import { useAuth } from '../../services/AuthContext'; 

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>(''); 
    const { login } = useAuth(); 
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await loginUser(email, password);
            console.log(response); 
            
            if (response.token) {
                sessionStorage.setItem('token', response.token);
            }
            
            await login({ id: response.userId, email }, response.token); 
            navigate('/'); 
        } catch (err: any) {
            console.error('Erreur de connexion:', err);
            setError(err.response?.data?.message || 'Une erreur est survenue');
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
