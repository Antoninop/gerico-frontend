import React from 'react';
import styles from './Archivedlist.module.scss';
import { fetchArchivedUsers } from '../../../../services/api';
import { useState, useEffect } from 'react';
import { SlOptions } from "react-icons/sl";

const Archivedlist: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const loadAdminInfo = async () => {
      try {
        const response = await fetchArchivedUsers();
        setData(response);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations', error);
      }
    };
    loadAdminInfo();
  }, []);

  const filteredData = data.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <div>Archive des salariés </div>
        <div>
          <input
            type="text"
            placeholder="Rechercher"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      

      <div>

      <div className={styles.usernumbers}>
        {filteredData.length} Salariés
      </div>
      
        <div className={styles.Arraytitles}>
          <div>Nom du salarié</div>
          <div>Poste occupé</div>
          <div>Jours de congès restant</div>
          <div></div>
        </div>
        {filteredData.length > 0 ? (
          filteredData.map((user, index) => (
            <div className={styles.UsersData} key={index}>
              <div>
                <div className={styles.Username}>{user.first_name} {user.last_name}</div>
                <div>{user.email}</div>
              </div>
              <div>{user.position}</div>
              <div>{user.remaining_holidays}</div>
              <div><SlOptions /></div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>Aucun salarié trouvé.</div>
        )}
        </div>
    </div>
  );
};

export default Archivedlist;

