import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.css';

export default function Button({
  onClick,
  children,
}: ButtonHTMLAttributes<any>) {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      {children}
    </button>
  );
}
