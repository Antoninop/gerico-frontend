import styles from './fiches.module.scss';
import Dashboard from '../dashboard/dashboard';
import { fetchPayroll } from '../../services/api'; 
import { useEffect, useState } from 'react';
import { GoDownload } from "react-icons/go";

interface Payroll {
  paye_id: number;
  pay_date: string;
  salary: number;
  file_path: string; 
}

const Fiches: React.FC = () => {
  const [payrollData, setPayrollData] = useState<Payroll[]>([]);  

  useEffect(() => {
    const fetchPayrollData = async () => {
      try {
        const response = await fetchPayroll();  
        if (response?.results) {
          setPayrollData(response.results);  
        } else {
          console.error("No payroll data found.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPayrollData();  
  }, []);  

  const handleDownload = (filePath: string) => {
    if (filePath) {
      const link = document.createElement('a');
      link.href = filePath;
      link.setAttribute('download', ''); 
      document.body.appendChild(link);
      link.click(); 
      document.body.removeChild(link); 
      console.log(`Downloading from: ${filePath}`);
    } else {
      console.warn('File path is missing');
    }
  };
  

  return (
    <div className={styles.container}>
      <Dashboard />

      <div className={styles.payrollTitles}>
        <div>Bonjour et bienvenue , Prénom 👋</div>
        <div className={styles.btnDLall}>Tout télécharger</div>
      </div>
      
      <div className={styles.payrollsubTitles}>
        <div>Fiches de paie</div>
        <div>Trier par </div>
      </div>
      {payrollData.length > 0 ? (
        <div className={styles.scrollableArea}>
          <ul className={styles.payrollList}>
            {payrollData
              .sort((a, b) => {
                const dateA = new Date(a.pay_date);
                const dateB = new Date(b.pay_date);
                return dateB.getTime() - dateA.getTime(); 
              })
              .map((payroll) => (
                <div className={styles.PayrollContainer}>
                <li key={payroll.paye_id} className={styles.payrollItem}>
                  <span>Paie ID:</span> {payroll.paye_id} <br />
                  <span>Date:</span> {payroll.pay_date} <br />
                  <span>Salaire:</span> {payroll.salary} <br />
                </li>
                <div className={styles.dlbtn} 
                 onClick={() => handleDownload(payroll.file_path)}
                  >
                    <GoDownload/>
                </div>
              </div>
              ))}
          </ul>
        </div>
      ) : (
        <p>Aucune fiche de paie trouvée.</p>
      )}
    </div>
  );
};

export default Fiches;
