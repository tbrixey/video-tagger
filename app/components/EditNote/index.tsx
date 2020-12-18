import React, { useEffect, useRef } from 'react';
import styles from './EditNote.css';

type Props = {
  seconds: string;
  value: string;
  onChange: (value: string) => void;
  current: boolean;
  onTimeClick: () => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

function formatSeconds(sec: string) {
  return new Date(Number(sec) * 1000)
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
  onTimeClick,
  onKeyUp,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (current && inputRef.current) {
      inputRef.current.focus();
    }
  }, [current]);

  return (
    <div className={styles.root}>
      <div className={styles.time} onClick={() => onTimeClick()}>
        {formatSeconds(seconds)}
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          type="text"
          ref={inputRef}
          value={value || ''}
          onChange={(e) => onChange(e.currentTarget.value)}
          onKeyUp={(e) => onKeyUp && onKeyUp(e)}
        />
      </div>
    </div>
  );
}
