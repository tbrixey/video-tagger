import React, { ButtonHTMLAttributes } from 'react';
import styles from './BaseButton.css';

export default function BaseButton({
  className,
  ...props
}: ButtonHTMLAttributes<any>) {
  return (
    <button
      className={` ${className} ${styles.button}`}
      type="button"
      {...props}
    />
  );
}
