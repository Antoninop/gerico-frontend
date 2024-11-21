import React from 'react';
import styles from './ManageConges.module.scss';

const ManageConges: React.FC = () => {

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
          <div></div>
        </div>
        </div>
    </div>
  );
};

export default ManageConges;

