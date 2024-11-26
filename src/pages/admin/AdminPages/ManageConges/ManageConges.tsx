import React, { useState, useEffect } from 'react';
import styles from './ManageConges.module.scss';
import { fetchAskedHoliday } from '../../../../services/api';

const ManageConges: React.FC = () => {

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const loadCongesData = async () => {
      try {
        const response = await fetchAskedHoliday();
        const data = response.data;
        setData(data?.users || []);
        console.log("Data fetched: ", response);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations', error);
      }
    };
    loadCongesData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>Gestion des congès</div>
      </div>
      
      <div>
        <div className={styles.Arraytitles}>
          <div>Nom du salarié</div>
          <div>Poste occupé</div>
          <div>Jours de congès restant</div>
          <div>Demandes de congès</div>
        </div>

        {data.length > 0 ? (
          data.map((user: any) => (
            <div key={user.user_id} className={styles.userRow}>
              <div>{user.first_name} {user.last_name}</div>
              <div>{user.position}</div>
              <div>{user.remaining_holidays} jours</div>
              <div>
                {user.holidays ? (
                  <div>
                    {user.holidays.pending.length > 0 && (
                      <div>
                        <h4>Demandes en attente:</h4>
                        <ul>
                          {user.holidays.pending.map((holiday: any, index: number) => (
                            <li key={index}>
                              {holiday.date} - {holiday.length} jours
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {user.holidays.approved.length > 0 && (
                      <div>
                        <h4>Demandes approuvées:</h4>
                        <ul>
                          {user.holidays.approved.map((holiday: any, index: number) => (
                            <li key={index}>
                              {holiday.date} - {holiday.length} jours
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {user.holidays.denied.length > 0 && (
                      <div>
                        <h4>Demandes refusées:</h4>
                        <ul>
                          {user.holidays.denied.map((holiday: any, index: number) => (
                            <li key={index}>
                              {holiday.date} - {holiday.length} jours
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>Aucune demande de congé</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>Pas de données disponibles.</div>
        )}
      </div>
    </div>
  );
};

export default ManageConges;
