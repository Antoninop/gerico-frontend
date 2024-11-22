import Dashboard from '../dashboard/dashboard';
import Calendar from 'react-calendar';
import { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import styles from './conges.module.scss';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { fetchHolidayInfo, askHoliday } from '../../services/api';

const Conges: React.FC = () => {
  type ValuePiece = Date | null;
  type Value = ValuePiece | [ValuePiece, ValuePiece];

  const [value, onChange] = useState<Value>(new Date());
  const [remainingHolidays, setRemainingHolidays] = useState<number | null>(null);
  const [PendingHolidays, setPendingHolidays] = useState<string[]>([]);
  const [AcceptedHolidays, setAcceptedHolidays] = useState<string[]>([]);
  const [DeniedHolidays, setDeniedHolidays] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 4);
  const maxDate = new Date(new Date().getFullYear(), 11, 31);

  useEffect(() => {
    const loadHolidayInfo = async () => {
      try {
        const response = await fetchHolidayInfo();
        setRemainingHolidays(response.remaining_holidays);

        const formatHoliday = (holidays: { date: string; length: string }[]) =>
          holidays.map(holiday => `${format(new Date(holiday.date), 'd MMMM', { locale: fr })} (${holiday.length === 'half_day' ? 'Demi-journée' : 'Journée complète'})`);

        setPendingHolidays(formatHoliday(response.holidays.pending));
        setAcceptedHolidays(formatHoliday(response.holidays.approved));
        setDeniedHolidays(formatHoliday(response.holidays.denied));
      } catch (error) {
        console.error('Erreur lors de la récupération des informations de congés :', error);
      }
    };

    loadHolidayInfo();
  }, []);

  const handleAskHoliday = async () => {
    if (!(value instanceof Date)) {
      setErrorMessage('Veuillez sélectionner une date valide.');
      return;
    }
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const formattedDate = format(value, 'yyyy-MM-dd');  
      await askHoliday('half_day', formattedDate); 

      const response = await fetchHolidayInfo();
      setRemainingHolidays(response.remaining_holidays);

      const formatHoliday = (holidays: { date: string; length: string }[]) =>
        holidays.map(holiday => `${format(new Date(holiday.date), 'd MMMM', { locale: fr })} (${holiday.length === 'half_day' ? 'Demi-journée' : 'Journée complète'})`);

      setPendingHolidays(formatHoliday(response.holidays.pending));
      setAcceptedHolidays(formatHoliday(response.holidays.approved));
      setDeniedHolidays(formatHoliday(response.holidays.denied));
    } catch (error) {
      console.error('Erreur lors de la demande de congés :', error);
      setErrorMessage('Erreur lors de la soumission de la demande.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const holidays = [
    new Date(new Date().getFullYear(), 0, 1), // Nouvel An
    new Date(new Date().getFullYear(), 4, 1), // Fête du Travail
    new Date(new Date().getFullYear(), 4, 8), // Victoire 1945
    new Date(new Date().getFullYear(), 6, 14), // Fête Nationale
    new Date(new Date().getFullYear(), 7, 15), // Assomption
    new Date(new Date().getFullYear(), 10, 1), // Toussaint
    new Date(new Date().getFullYear(), 10, 11), // Armistice
    new Date(new Date().getFullYear(), 11, 25), // Noël
  ];

  const isHoliday = (date: Date) =>
    holidays.some(holiday => holiday.toDateString() === date.toDateString());

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
              isHoliday(date) || date.getDay() === 0 || date.getDay() === 6
            }
            locale="fr-FR"
          />
          <div className={styles.infoSection}>
            <div>Jour de congés restant : {remainingHolidays !== null ? remainingHolidays : 'Chargement...'}</div>
            <div>Jour de congés restant théorique : {remainingHolidays !== null ? remainingHolidays : 'Chargement...'}</div>
            <div>
              En attente :
              {PendingHolidays.length > 0 ? (
                <ul>
                  {PendingHolidays.map((holiday, index) => (
                    <li key={index}>{holiday}</li>
                  ))}
                </ul>
              ) : (
                ' Aucun congé en attente.'
              )}
            </div>
            <div>
              Validé :
              {AcceptedHolidays.length > 0 ? (
                <ul>
                  {AcceptedHolidays.map((holiday, index) => (
                    <li key={index}>{holiday}</li>
                  ))}
                </ul>
              ) : (
                ' Aucun congé validé.'
              )}
            </div>
            <div>
              Refusé :
              {DeniedHolidays.length > 0 ? (
                <ul>
                  {DeniedHolidays.map((holiday, index) => (
                    <li key={index}>{holiday}</li>
                  ))}
                </ul>
              ) : (
                ' Aucun congé refusé.'
              )}
            </div>
          </div>
        </div>
        <p>
          Date sélectionnée :{' '}
          {value instanceof Date ? format(value, 'd MMMM', { locale: fr }) : 'Aucune date sélectionnée'}
        </p>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <button
          onClick={handleAskHoliday}
          disabled={isSubmitting || !(value instanceof Date)}
          className={isSubmitting ? styles.loadingButton : ''}
        >
          {isSubmitting ? 'Envoi...' : 'Demander un congé'}
        </button>
      </div>
    </div>
  );
};

export default Conges;
