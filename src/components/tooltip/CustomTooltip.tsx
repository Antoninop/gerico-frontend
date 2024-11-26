import React from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import styles from './CustomTooltip.module.scss'; 

interface CustomTooltipProps {
  id: string;
  children: React.ReactNode; 
  place?: 'top' | 'bottom' | 'left' | 'right'; 
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ id, children, place = 'top' }) => {
  return (
    <Tooltip
      id={id}
      place={place}
      clickable={true} // Permet de cliquer sur le contenu
      className={styles.customtooltip} 
    >
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
