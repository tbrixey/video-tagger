import React, { useEffect, useRef } from 'react';
import styles from './EditNote.css';

type Props = {
  seconds: string;
  value: string;
  onChange: (value: string) => void;
  current: boolean;
  onTimeClick: () => void;
  helpText?: string;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  removeNote: (time: string) => void;
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
  onFocus,
  onKeyDown,
  helpText,
  removeNote,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (current && inputRef.current) {
      if (document.activeElement !== inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [current]);

  return (
    <div className={`${styles.root}`}>
      <div className={styles.status}>
        {current && (
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
          </svg>
        )}
      </div>
      <div className={styles.time} onClick={() => onTimeClick()}>
        {formatSeconds(seconds)}
      </div>
      <div style={{ width: 24, visibility: current ? 'hidden' : 'visible' }}>
        <div onClick={() => removeNote(seconds)}>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
          </svg>
        </div>
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          type="text"
          ref={inputRef}
          value={value || ''}
          onChange={(e) => onChange(e.currentTarget.value)}
          onKeyDown={(e) => onKeyDown && onKeyDown(e)}
          onFocus={() => onFocus && onFocus()}
        />
        {current && <div className={styles.inputHint}>{helpText}</div>}
      </div>
    </div>
  );
}
