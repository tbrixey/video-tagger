import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.css';

export default function Button({ onClick }: ButtonHTMLAttributes<any>) {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      Open Folder
    </button>
  );
}
