import React, { useState } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import styles from './NewPassword.module.scss';
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { CgPassword } from "react-icons/cg";
import Input from '../../../components/input/Input'; 


const NewPassword: React.FC = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState<string>('');
    const [confirmpassword, setConfirmpassword] = useState<string>('');



    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            navigate('/login');
        } catch (err: any) {
            console.error('Erreur de connexion:', err);
        }
    };

    const handleBacklogin = () => {
        navigate('/login');
    };

    return (
        <div>
            <Navbar />
            <div className={styles.loginContainer}>
                <div className={styles.Container}>
                    <div className={styles.loginLogo}><CgPassword /></div>
                    <h2>Nouveau mot de passe</h2>
                    <div className={styles.Subtitle}>
                        Doit posseder au moins <strong>8</strong> caractères
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Input
                            type="password"
                            id="password"
                            label="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Input
                            label="Confirmation du mot de passe"
                            type="password"
                            id="ConfirmPassword"
                            value={confirmpassword}
                            onChange={(e) => setConfirmpassword(e.target.value)}
                            required
                        />
                        <button type="submit" className={styles.submitButton}>Confirmer</button>
                        <div className={styles.backSubtitle} onClick={handleBacklogin}>
                            <IoMdArrowBack />Retour à la connexion
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewPassword;
