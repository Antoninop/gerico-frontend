import styles from './conges.module.scss';
import Dashboard from '../dashboard/dashboard';
import Calendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const Conges: React.FC = () => {
    type ValuePiece = Date | null;
    type Value = ValuePiece | [ValuePiece, ValuePiece];
    const [value, onChange] = useState<Value>(new Date());

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 4); // jour minimum dans 4 jours

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear(), 11, 31); // maximum -> 31 décembre de cette année

    const holidays = [
        new Date(new Date().getFullYear(), 0, 1),  // Nouvel An
        new Date(new Date().getFullYear(), 4, 1),  // Fête du Travail
        new Date(new Date().getFullYear(), 4, 8),  // Victoire 1945
        new Date(new Date().getFullYear(), 6, 14), // Fête Nationale
        new Date(new Date().getFullYear(), 7, 15), // Assomption
        new Date(new Date().getFullYear(), 10, 1), // Toussaint
        new Date(new Date().getFullYear(), 10, 11), // Armistice
        new Date(new Date().getFullYear(), 11, 25), // Noël
    ];

    const isHoliday = (date: Date) => {
        return holidays.some(holiday => 
            holiday.toDateString() === date.toDateString()
        );
    };

    return (
        <div className={styles.container}>
            <Dashboard />
            <div>
                <Calendar 
                    onChange={onChange} 
                    value={value} 
                    minDate={minDate} 
                    maxDate={maxDate} 
                    tileDisabled={({ date }) => isHoliday(date) || date.getDay() === 0 || date.getDay() === 6}
                />
                <p>Date sélectionnée : {value instanceof Date ? format(value, 'dd/MM/yyyy', { locale: fr }) : 'Aucune date sélectionnée'}</p>
            </div>
        </div>
    );
};

export default Conges;
