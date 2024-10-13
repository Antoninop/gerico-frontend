import styles from './fiches.module.scss';
import Dashboard from '../dashboard/dashboard';
import { fetchPayroll } from '../../services/api'; 
import { useEffect, useState } from 'react';

const Fiches: React.FC = () => {
  const [payrollData, setPayrollData] = useState<any[]>([]);  

  useEffect(() => {
    const fetchPayrollData = async () => {
      try {
        const response = await fetchPayroll();  
        setPayrollData(response.results);  
        console.log('Réponse de l\'API:', response);
      } catch (error) {
        console.error('Erreur lors de la récupération des fiches de paie:', error);
      }
    };

    fetchPayrollData();  
  }, []);  

  return (
    <div className={styles.container}>
      <Dashboard />
      <h1>Fiches de paie</h1>
      {payrollData.length > 0 ? (
        <ul>
          {payrollData.map((payroll) => (
            <li key={payroll.paye_id}>
              <strong>Paie ID:</strong> {payroll.paye_id} <br />
              <strong>Date de paie:</strong> {payroll.pay_date} <br />
              <strong>Salaire:</strong> {payroll.salary} <br />
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune fiche de paie trouvée.</p>
      )}
    </div>
  );
};

export default Fiches;
