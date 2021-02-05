import React, { useEffect, useRef } from "react";
import styled from "styled-components";

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
    .split(":")
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
}

const Root = styled.div`
  border-bottom: 1px solid #ffffff99;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Status = styled.div`
  width: 10px;
`;
const Time = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
`;
const InputContainer = styled.div`
  flex: 1;
  position: relative;
`;
const Input = styled.input`
  background: transparent;
  border: 0;
  font-size: 14px;
  color: white;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  &:focus {
    outline: 0;
    background: #ffffff22;
  }
`;
const InputHint = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  font-size: 12px;
  opacity: 0.4;
  z-index: -1;
  transform: translateY(-50%);
`;

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
    <Root>
      <Status>
        {current && (
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
          </svg>
        )}
      </Status>
      <Time onClick={() => onTimeClick()}>{formatSeconds(seconds)}</Time>
      <div
        style={{
          width: 24,
          visibility: current ? "hidden" : "visible",
          cursor: "pointer",
        }}
      >
        <div onClick={() => removeNote(seconds)}>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
          </svg>
        </div>
      </div>
      <InputContainer>
        <Input
          type="text"
          ref={inputRef}
          value={value || ""}
          onChange={(e) => onChange(e.currentTarget.value)}
          onKeyDown={(e) => onKeyDown && onKeyDown(e)}
          onFocus={() => onFocus && onFocus()}
        />
        {current && <InputHint>{helpText}</InputHint>}
      </InputContainer>
    </Root>
  );
}
