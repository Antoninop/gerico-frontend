import styles from './dashboard.module.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import { IoDocument,IoAirplane,IoPerson,IoBuildSharp } from "react-icons/io5";

const Dashboard: React.FC = () => {
    return (
        <div className={styles.container}>
            <Sidebar 
                items={[
                    <><IoDocument /> Mes fiches de paie</>,
                    <><IoAirplane /> Gerer mes congés</>,
                    <><IoPerson /> Mon compte</>,
                    <><IoBuildSharp /> Administration</>,
                ]}
            />
            <h1>test</h1>
        </div>
    );
};

export default Dashboard;
