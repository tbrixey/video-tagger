import React, { useEffect, useRef } from 'react';
import styles from './EditNote.css';

type Props = {
  seconds: string;
  value: string;
  onChange: (value: string) => void;
  current: boolean;
};

function formatSeconds(sec: string) {
  return new Date(parseInt(sec) * 1000)
    .toISOString()
    .substr(11, 8)
    .split(':')
    .filter((v, i) => v !== '00' || i > 0)
    .join(':');
}

export default function EditVideo({
  seconds,
  value,
  onChange,
  current,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (current && inputRef.current) {
      inputRef.current.focus();
    }
  }, [current]);

  return (
    <div className={styles.root}>
      <div className={styles.time}>{formatSeconds(seconds)}</div>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          type="text"
          ref={inputRef}
          value={value || ''}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      </div>
    </div>
  );
}
