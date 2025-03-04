import React from 'react';
import styles from './Loading.module.scss'; 

const Loading: React.FC = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Chargement...</p>
        </div>
    );
};

export default Loading;
