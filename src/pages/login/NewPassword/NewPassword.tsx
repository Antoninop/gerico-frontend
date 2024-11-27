import React, { useState } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import styles from './NewPassword.module.scss';
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from 'react-router-dom';
import { CgPassword } from "react-icons/cg";
import Input from '../../../components/input/Input'; 
import { Newpassword } from '../../../services/api';

const NewPassword: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [password, setPassword] = useState<string>('');
    const [confirmpassword, setConfirmpassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    const email = location.state?.email;
    const acceptID = location.state?.id;

    const validatePasswords = () => {
        if (password !== confirmpassword) {
            setPasswordError('Les mots de passe ne correspondent pas.');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        validatePasswords();

        if (passwordError || password.length < 8) {
            return;
        }

        try {
            const response = await Newpassword(email, acceptID, password);
            if (response.status === 200) {
                navigate('/login');
            }
        } catch (err: any) {
            console.error('Erreur de connexion:', err);
        }
    };

    const handleBacklogin = () => {
        navigate('/login');
    };

    return (
        <div>
            <Navbar isDashboard={false} />
            <div className={styles.loginContainer}>
                <div className={styles.Container}>
                    <div className={styles.loginLogo}><CgPassword /></div>
                    <h2>Nouveau mot de passe</h2>
                    <div className={styles.Subtitle}>
                        Doit posséder au moins <strong>8</strong> caractères
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Input
                            type="password"
                            id="password"
                            label="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={validatePasswords}
                            required
                        />
                        <Input
                            label="Confirmation du mot de passe"
                            type="password"
                            id="ConfirmPassword"
                            value={confirmpassword}
                            onChange={(e) => setConfirmpassword(e.target.value)}
                            onBlur={validatePasswords}
                            required
                        />
                        {passwordError && (
                            <div className={styles.errorMessage}>{passwordError}</div>
                        )}
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={!password || !confirmpassword || passwordError !== '' || password.length < 8}
                        >
                            Confirmer
                        </button>
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
