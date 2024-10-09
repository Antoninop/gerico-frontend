import styles from './conges.module.scss';
import Dashboard from '../dashboard/dashboard';

const Conges: React.FC = () => {


    return (
        <div className={styles.container}>
            <Dashboard>
            </Dashboard>
            <h1>CONGES</h1>
        </div>
    );
};

export default Conges;
