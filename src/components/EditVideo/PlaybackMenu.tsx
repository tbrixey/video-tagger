import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { playbackSpeeds } from "./constants";
import SpeedIcon from "@material-ui/icons/Speed";
import { IconButton, Box, SvgIcon } from "@material-ui/core";
import { mdiPlaySpeed } from "@mdi/js";

type Props = {
  initialSpeed?: number;
  onChange?: (speed: number) => void;
};

export function PlaybackMenu({ initialSpeed, onChange }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [speed, setSpeed] = React.useState(initialSpeed || 1);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box ml={1}>
      <IconButton onClick={handleClick}>
        <SvgIcon>
          <path d={mdiPlaySpeed}></path>
        </SvgIcon>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {playbackSpeeds.map((s) => (
          <MenuItem
            key={s}
            selected={s === speed}
            onClick={() => {
              onChange && onChange(s);
              handleClose();
              setSpeed(s);
            }}
          >
            {s}x
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
