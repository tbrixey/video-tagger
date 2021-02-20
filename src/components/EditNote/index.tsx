import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import ArrowIcon from "@material-ui/icons/ArrowRight";
import { IconButton, InputBase, Menu, MenuItem } from "@material-ui/core";
import { formatSeconds } from "../../utils/formatSeconds";
import MenuIcon from "@material-ui/icons/MoreVert";

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
  display: flex;
  align-items: center;
`;
const Input = styled(InputBase)`
  font-size: 14px;
  input {
    padding: 10px 10px 10px 70px;
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    if (current && inputRef.current) {
      if (document.activeElement !== inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [current]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

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
        <div style={{ visibility: current ? "hidden" : "visible" }}>
          <IconButton onClick={handleClick} size="small">
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                removeNote(seconds);
                handleClose();
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </div>
      </InputContainer>
    </Root>
  );
}
