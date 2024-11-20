import { useState } from 'react';
import styles from './admin.module.scss';
import Navbar from '../../components/navbar/Navbar';
import Archivedlist from './AdminPages/Archivedlist/Archivedlist';
import ManageConges from './AdminPages/ManageConges/ManageConges';
import UserAdd from './AdminPages/Useradd/Useradd';
import Userlist from './AdminPages/Userlist/Userlist';

const Admin: React.FC = () => {
  const [PageChosen, setPageChosen] = useState<React.FC>(() => ManageConges);

  const handlePageChange = (page: React.FC) => {
    setPageChosen(() => page);
  };

  return (
    <div className={styles.container}>
      <Navbar isDashboard={true} />
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <ul>
            <li onClick={() => handlePageChange(ManageConges)}>Gestion des congès</li>
            <li onClick={() => handlePageChange(Userlist)}>Liste des salariés</li>
            <li onClick={() => handlePageChange(UserAdd)}>Ajouter un salarié</li>
            <li onClick={() => handlePageChange(Archivedlist)}>Archive des salariés </li>
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
