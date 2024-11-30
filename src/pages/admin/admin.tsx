import { useState } from 'react';
import styles from './admin.module.scss';
import Navbar from '../../components/navbar/Navbar';
import Archivedlist from './AdminPages/Archivedlist/Archivedlist';
import ManageConges from './AdminPages/ManageConges/ManageConges';
import UserAdd from './AdminPages/Useradd/Useradd';
import Userlist from './AdminPages/Userlist/Userlist';

const Admin: React.FC = () => {
  const [PageChosen, setPageChosen] = useState<React.FC>(() => ManageConges);
  const [activePage, setActivePage] = useState<string>('ManageConges');

  const handlePageChange = (page: React.FC, pageName: string) => {
    setPageChosen(() => page);
    setActivePage(pageName);
  };

  return (
    <div className={styles.container}>
      <Navbar isDashboard={true} />
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <ul>
            <li
              className={activePage === 'ManageConges' ? styles.active : ''}
              onClick={() => handlePageChange(ManageConges, 'ManageConges')}
            >
              Gestion des congès
            </li>
            <li
              className={activePage === 'Userlist' ? styles.active : ''}
              onClick={() => handlePageChange(Userlist, 'Userlist')}
            >
              Liste des salariés
            </li>
            <li
              className={activePage === 'UserAdd' ? styles.active : ''}
              onClick={() => handlePageChange(UserAdd, 'UserAdd')}
            >
              Ajouter un salarié
            </li>
            <li
              className={activePage === 'Archivedlist' ? styles.active : ''}
              onClick={() => handlePageChange(Archivedlist, 'Archivedlist')}
            >
              Archive des salariés
            </li>
          </ul>
        </div>
        <div className={styles.panel}>
          <PageChosen />
        </div>
      </div>
    </div>
  );
};

export default Admin;
