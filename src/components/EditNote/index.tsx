import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import ArrowIcon from "@material-ui/icons/ArrowRight";
import DeleteIcon from "@material-ui/icons/RemoveCircleOutline";
import { IconButton, InputBase } from "@material-ui/core";

type Props = {
  seconds: string;
  value: string;
  onChange: (value: string) => void;
  current: boolean;
  onTimeClick: () => void;
  helpText?: string;
  onFocus?: () => void;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
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
const Time = styled.div`
  cursor: pointer;
`;
const InputContainer = styled.div`
  flex: 1;
  position: relative;
`;
const Input = styled(InputBase)`
  font-size: 14px;
  input {
    padding: 10px 10px 10px 100px;
  }
  input:focus {
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
      <InputContainer>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
            display: "flex",
            bottom: 0,
            alignItems: "center",
          }}
        >
          <ArrowIcon style={{ visibility: current ? "visible" : "hidden" }} />
          <Time onClick={() => onTimeClick()}>{formatSeconds(seconds)}</Time>
          <div
            style={{
              width: 30,
              visibility: current ? "hidden" : "visible",
              cursor: "pointer",
            }}
          >
            <IconButton
              color="secondary"
              size="small"
              onClick={() => removeNote(seconds)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <Input
          fullWidth
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
