import React from 'react';
import styles from './input.module.scss';

interface InputProps {
    type: string;
    id: string;
    label?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void; 
    required?: boolean;
    disabled?: boolean; 
    placeholder?: string;
}

const Input: React.FC<InputProps> = ({ type, id, label, value, onChange, required = false, disabled = false, placeholder,onBlur }) => {
    return (
        <div className={styles.inputGroup}>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}  
                onBlur={onBlur}
                className={`${styles.inputField} ${disabled ? styles.disabled : ''}`}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Input;
