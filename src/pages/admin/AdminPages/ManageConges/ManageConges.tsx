import React, { useState, useEffect } from 'react';
import styles from './ManageConges.module.scss';
import { fetchAskedHoliday } from '../../../../services/api';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import CustomTooltip from '../../../../components/tooltip/CustomTooltip'; 
import { SlOptions } from 'react-icons/sl';
import { MdArchive } from "react-icons/md";

const ManageConges: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  const handleArchiveUser = async (email: string) => {
    console.log('Archiving user with email:', email);
  }

  useEffect(() => {
    const loadCongesData = async () => {
      try {
        const response = await fetchAskedHoliday();
        const usersWithRequests = response.data?.users.filter((user: any) => {
          const { holidays } = user;
          return (
            holidays &&
            (holidays.pending.length > 0 || holidays.approved.length > 0 || holidays.denied.length > 0)
          );
        });
        setData(usersWithRequests || []);
      } catch (error) {
        console.error(error);
      }
    };
    loadCongesData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>Gestion des congès</div>
      </div>

      {data.length > 0 ? (
        <div className={styles.userList}>
          <div className={styles.arrayTitles}>
            <span>Nom</span>
            <span>Date</span>
            <span>Durée</span>
          </div>
          {data.map((user: any) =>
            user.holidays.pending.map((holiday: any, index: number) => (
              <div key={`${user.user_id}-${index}`} className={styles.userRow}>
                <div className={styles.userName}>
                  {user.first_name} {user.last_name}
                </div>
                <div>
                  {typeof holiday.date === 'string'
                    ? format(new Date(holiday.date), 'd MMMM', { locale: fr })
                    : 'Date invalide'}
                </div>
                <div>
                  {holiday.length === 0.5 ? 'Demi-journée' : 'Journée complète'}
                </div>
                <div>
                <SlOptions
                  data-tooltip-id={`tooltip-${index}`}
                  style={{ cursor: 'pointer' }}
                />
                <CustomTooltip id={`tooltip-${index}`} place="left">
                  <div className={styles.tooltipMenu}>
                    <div onClick={() => handleArchiveUser(user.id)}>
                      <MdArchive/>Accepter
                    </div>
                    <div onClick={() => handleArchiveUser(user.email)}>
                      <MdArchive/>Refuser
                    </div>
                  </div>
                </CustomTooltip>
              </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className={styles.noData}>Pas de demandes de congés disponibles.</div>
      )}
    </div>
  );
};

export default ManageConges;
