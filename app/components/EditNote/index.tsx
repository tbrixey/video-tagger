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
      <div className={styles.status}>{current && '»'}</div>
      <div className={styles.time} onClick={() => onTimeClick()}>
        {formatSeconds(seconds)}
      </div>
      {!current && <div onClick={() => removeNote(seconds)}>x</div>}
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
