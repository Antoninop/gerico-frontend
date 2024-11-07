import React, { useState } from 'react';
import Input from '../../../components/input/Input'; 
import Navbar from '../../../components/navbar/Navbar';
import styles from './ForgotPassword.module.scss';
import { IoMdFingerPrint,IoMdArrowBack } from "react-icons/io";
import {useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            navigate('/confirmation-renit', { state: { email } });
        } catch (err: any) {
            console.error('Erreur de connexion:', err);
        }
    };
    

    const handleBacklogin = () => {
        navigate('/login');
    } 


    return (
        
        <div>
            <Navbar />
            <div className={styles.loginContainer}>
                <div className={styles.Container}>
                    <div className={styles.loginLogo}><IoMdFingerPrint /></div>
                    <h2>Mot de passe oublié ?</h2>
                    <div className={styles.Subtitle}>N'ayez crainte, nous vous envoyons les instructions pour la rénitialisation</div>
                    <form onSubmit={handleSubmit}>
                        <Input
                            type="email"
                            id="email"
                            label="Adresse email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className={styles.submitButton}>Rénitialiser votre mot de passe</button>
                        <div className={styles.backSubtitle} onClick={handleBacklogin}><IoMdArrowBack />Retour à la connexion</div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
