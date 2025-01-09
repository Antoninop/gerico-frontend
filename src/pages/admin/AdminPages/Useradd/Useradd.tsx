import React, { useState } from 'react';
import styles from './Useradd.module.scss';
import { sendInvitation } from '../../../../services/api'; // Assurez-vous que cette fonction est définie correctement

const UserAdd: React.FC = () => {
  const [email, setEmail] = useState<string>(''); // État pour stocker l'adresse email
  const [message, setMessage] = useState<string>(''); // État pour afficher un message de feedback
  const [loading, setLoading] = useState<boolean>(false); // État pour gérer le chargement

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    if (!email) {
      setMessage('Veuillez entrer une adresse email.');
      return;
    }

    setLoading(true);
    setMessage(''); // Réinitialiser le message

    try {
      const response = await sendInvitation({ email });
      setMessage(response.message || 'Invitation envoyée avec succès.');
    } catch (error: any) {
      console.error('Erreur lors de l\'envoi de l\'invitation:', error);
      setMessage(
        error.response?.data?.message || 'Erreur lors de l\'envoi de l\'invitation.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>Ajouter un salarié</div>
      </div>

      <div className={styles.form}>
        <input
          type="email"
          placeholder="Entrez l'adresse email"
          value={email}
          onChange={handleInputChange}
          className={styles.input}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`${styles.button} ${loading ? styles.disabled : ''}`}
        >
          {loading ? 'Envoi...' : 'Envoyer l\'invitation'}
        </button>
      </div>

      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
};

export default UserAdd;
