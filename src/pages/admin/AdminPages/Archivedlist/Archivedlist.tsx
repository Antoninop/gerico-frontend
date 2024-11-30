import React from 'react';
import styles from './Archivedlist.module.scss';
import { fetchArchivedUsers, UnarchiveUser } from '../../../../services/api';
import { useState, useEffect } from 'react';
import CustomTooltip from '../../../../components/tooltip/CustomTooltip'; 
import { SlOptions } from "react-icons/sl";
import { MdArchive } from "react-icons/md";
import { FaPen } from "react-icons/fa6";

const Archivedlist: React.FC = () => {
  const [Userdata, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    loadAdminInfo();
  }, []);


  const loadAdminInfo = async () => {
    try {
      const response = await fetchArchivedUsers();
      const data = response.data;
      setData(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error('Erreur lors de la récupération des informations', error);
    }
  };

  const handleUnArchiveUser = async (email: string) => {
    try {
      await UnarchiveUser(email); 
      loadAdminInfo();
    } catch (error) {
      console.error('Erreur lors de la désarchivation', error);
    }
  };
  

  const filteredData = Userdata.filter(
    (Userdata) =>
      Userdata.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Userdata.last_name.toLowerCase().includes(searchTerm.toLowerCase())
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
              <div>
                <SlOptions
                  data-tooltip-id={`tooltip-${index}`}
                  style={{ cursor: 'pointer' }}
                />
                <CustomTooltip id={`tooltip-${index}`} place="left">
                  <div className={styles.tooltipMenu}>
                    <div onClick={() => handleUnArchiveUser(user.id)}>
                      <FaPen/>Modifier
                    </div>
                    <div onClick={() => handleUnArchiveUser(user.email)}>
                      <MdArchive/>Désarchiver
                    </div>
                  </div>
                </CustomTooltip>
              </div>
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

