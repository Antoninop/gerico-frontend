import styles from './fiches.module.scss';
import Dashboard from '../dashboard/dashboard';

const Fiches: React.FC = () => {


    return (
        <div className={styles.container}>
            <Dashboard></Dashboard>
            <h1>Fiches</h1>
        </div>
    );
};

export default Fiches;
