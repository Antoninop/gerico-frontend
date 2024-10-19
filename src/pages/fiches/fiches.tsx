import styles from './fiches.module.scss';
import Dashboard from '../dashboard/dashboard';
import Loading from '../../components/loading/Loading';  
import { fetchPayroll } from '../../services/api'; 
import { useEffect, useState } from 'react';
import { GoDownload } from "react-icons/go";
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface Payroll {
  paye_id: number;
  pay_date: string;
  salary: number;
  file_path: string; 
}

const Fiches: React.FC = () => {
  const [payrollData, setPayrollData] = useState<Payroll[]>([]);  
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'); 
  const [loading, setLoading] = useState(true);  
  const [firstname] = useState(sessionStorage.getItem('firstname') || '');

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
      } finally {
        setLoading(false);  
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

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'desc' ? 'asc' : 'desc')); 
  };

  const sortedPayrollData = [...payrollData].sort((a, b) => {
    const dateA = new Date(a.pay_date).getTime();
    const dateB = new Date(b.pay_date).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB; 
  });

  return (
    <div className={styles.container}>
      <Dashboard />

      <div className={styles.payrollTitles}>
        <div>Bonjour, {firstname} 👋</div>
        <div className={styles.btnDLall}>Tout télécharger</div>
      </div>
      
      <div className={styles.payrollsubTitles}>
        <div>Fiches de paie</div>
        <div className={styles.sortButton} onClick={toggleSortOrder}>
          Trier par {sortOrder === 'desc' ? 'plus ancien' : 'plus récent'} 
          {sortOrder === 'desc' ? <FaArrowDown /> : <FaArrowUp />} 
        </div>
      </div>

      {loading ? (  
        <Loading />  
      ) : (
        sortedPayrollData.length > 0 ? (
          <div className={styles.scrollableArea}>
            <ul className={styles.payrollList}>
              {sortedPayrollData.map((payroll) => {
                const payDate = new Date(payroll.pay_date);
                const month = payDate.toLocaleString('default', { month: 'short' }).toUpperCase(); 
                const year = payDate.getFullYear(); 
                return (
                  <div className={styles.PayrollContainer} key={payroll.paye_id}>
                    <div className={styles.PayrollDate}>
                      <div>{month}</div>  
                      <div>{year}</div>  
                    </div>
                    <li className={styles.payrollItem}>
                      <span>Paie ID:</span> {payroll.paye_id} <br />
                      <span>Salaire:</span> {payroll.salary} <br />
                    </li>
                    <div className={styles.dlbtn} 
                      onClick={() => handleDownload(payroll.file_path)}
                    >
                      <GoDownload />
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
        ) : (
          <p>Aucune fiche de paie trouvée , revenez plus tard.</p>
        )
      )}
    </div>
  );
};

export default Fiches;
