import React, { useState } from 'react';
import styles from './createUser.module.scss';
import { post } from '../../../services/api'; 

interface UserForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  position: string;
  isAdmin: boolean;
}

const CreateUser: React.FC = () => {
  const [userForm, setUserForm] = useState<UserForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    position: '',
    isAdmin: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUserForm({
      ...userForm,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

 


    setError(null);
    setSuccess(null);

    try {
      const response = await post('/register', userForm);
      console.log('Utilisateur créé avec succès :', response);

      setSuccess('Utilisateur créé avec succès.');
      setUserForm({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dateOfBirth: '',
        position: '',
        isAdmin: false,
      });
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      setError('Erreur lors de la création de l\'utilisateur. Veuillez réessayer.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Créer un nouvel utilisateur</h2>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName">Prénom :</label>
          <input
            type="text"
            name="firstName"
            value={userForm.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName">Nom de famille :</label>
          <input
            type="text"
            name="lastName"
            value={userForm.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            name="email"
            value={userForm.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            name="password"
            value={userForm.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="dateOfBirth">Date de naissance :</label>
          <input
            type="date"
            name="dateOfBirth"
            value={userForm.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="position">Poste :</label>
          <input
            type="text"
            name="position"
            value={userForm.position}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>
            <input
              type="checkbox"
              name="isAdmin"
              checked={userForm.isAdmin}
              onChange={handleChange}
            />
            Administrateur
          </label>
        </div>

        <button type="submit" className={styles.submitButton}>Créer utilisateur</button>
      </form>
    </div>
  );
};

export default CreateUser;
