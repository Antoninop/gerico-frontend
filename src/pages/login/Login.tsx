import React, { useState } from 'react';
import styles from './login.module.scss';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/input/Input'; 
import Navbar from '../../components/navbar/Navbar';
import { loginUser } from '../../services/api';
import { useAuth } from '../../services/AuthContext'; 
import { RiHome2Line } from "react-icons/ri";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>(''); 
    const {login } = useAuth(); 
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await loginUser(email, password);
            const data = response.data;
            if (data.token) {
                sessionStorage.setItem('token', data.token);
            }
            await login(data.token); 
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
                    <div className={styles.loginLogo}><RiHome2Line /></div>
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
                        <div className={styles.labelContainer}>
                            <label htmlFor="password" className={styles.passwordForgot}>Mot de passe</label>
                            <Link to="/requete-motdepasse" className={styles.passwordForgotLink}>Mot de passe oublié ?</Link>
                        </div>
                        <Input
                            label=''
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className={styles.submitButton}>Connexion à votre compte</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
