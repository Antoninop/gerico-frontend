import React from 'react';
import styles from './input.module.scss';

interface InputProps {
    type: string;
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled?: boolean; 
}

const Input: React.FC<InputProps> = ({ type, id, label, value, onChange, required = false, disabled = false }) => {
    return (
        <div className={styles.inputGroup}>
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}  
                className={styles.inputField}
            />
        </div>
    );
};

export default Input;
