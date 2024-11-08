import React, { useState } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import styles from './PasswordRequest.module.scss';
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from 'react-router-dom';
import { IoMailOpenOutline } from "react-icons/io5";

const PasswordRequest: React.FC = () => {
    const [code, setCode] = useState<string[]>(Array(5).fill(''));
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || 'adresse@email';

    const handleChange = (value: string, index: number) => {
        if (/^\d$/.test(value) || value === '') { 
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value !== '' && index < 4) {
                document.getElementById(`code-input-${index + 1}`)?.focus();
            }
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
        if (event.key === 'Backspace' && code[index] === '' && index > 0) {
            document.getElementById(`code-input-${index - 1}`)?.focus();
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Code:", code.join(''));
        try {
            navigate('/nouveau-motdepasse');
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
                    <div className={styles.loginLogo}><IoMailOpenOutline /></div>
                    <h2>Rénitialisation du mot de passe</h2>
                    <div className={styles.Subtitle}>
                        Nous vous avons envoyé un code à <strong>{email}</strong>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className={styles.codeInputContainer}>
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`code-input-${index}`}
                                    type="text"
                                    maxLength={1}
                                    className={styles.codeInput}
                                    value={digit}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                />
                            ))}
                        </div>
                        
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

export default PasswordRequest;
