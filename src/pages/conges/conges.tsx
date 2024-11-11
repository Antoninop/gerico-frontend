import Dashboard from '../dashboard/dashboard';
import Calendar from 'react-calendar';
import { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import styles from './conges.module.scss';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { fetchHolidayInfo } from '../../services/api';

const Conges: React.FC = () => {
    type ValuePiece = Date | null;
    type Value = ValuePiece | [ValuePiece, ValuePiece];
    
    const [value, onChange] = useState<Value>(new Date());
    const [remainingHolidays, setRemainingHolidays] = useState<number | null>(null);
    const currentYear = new Date().getFullYear();

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 4); 
    const maxDate = new Date(currentYear, 11, 31); 

    useEffect(() => {
      const loadHolidayInfo = async () => {
        try {
          const response = await fetchHolidayInfo();
          setRemainingHolidays(response.remaining_holidays); 
        } catch (error) {
          console.error("Erreur lors de la récupération des informations de congés :", error);
        }
      };

      loadHolidayInfo();
    }, []);

    const holidays = [
        new Date(currentYear, 0, 1),  // Nouvel An
        new Date(currentYear, 4, 1),  // Fête du Travail
        new Date(currentYear, 4, 8),  // Victoire 1945
        new Date(currentYear, 6, 14), // Fête Nationale
        new Date(currentYear, 7, 15), // Assomption
        new Date(currentYear, 10, 1), // Toussaint
        new Date(currentYear, 10, 11), // Armistice
        new Date(currentYear, 11, 25), // Noël
    ];

    const isHoliday = (date: Date) => holidays.some(holiday => holiday.toDateString() === date.toDateString());

    return (
        <div className={styles.container}>
            <Dashboard />
            <div>
                <div className={styles.title}>Ajouter un jour de congés</div>
                <div className={styles.calendarSection}>
                    <Calendar 
                        className={styles.calendar}
                        onChange={onChange} 
                        value={value} 
                        minDate={minDate} 
                        maxDate={maxDate} 
                        view="month" 
                        maxDetail="month" 
                        tileDisabled={({ date }) => 
                            isHoliday(date) || 
                            date.getDay() === 0 || 
                            date.getDay() === 6
                        }
                        locale="fr-FR" 
                    />
                    <div className={styles.infoSection}>
                        <div>Jour de congés restant : {remainingHolidays !== null ? remainingHolidays : 'Chargement...'}</div>
                        <div>En attente :</div>
                        <div>Validé :</div>
                    </div>
                </div>
                <p>
                    Date sélectionnée :{' '}
                    {value instanceof Date ? format(value, 'dd/MM/yyyy', { locale: fr }) : 'Aucune date sélectionnée'}
                </p>
            </div>
        </div>
    );
};

export default Conges;
