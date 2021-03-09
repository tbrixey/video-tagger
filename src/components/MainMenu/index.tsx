import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton, Menu, MenuItem } from "@material-ui/core";

type Props = {
  onChangeFolder?: () => void;
};
export function MainMenu({ onChangeFolder }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeFolder = () => {
    onChangeFolder && onChangeFolder();
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleChangeFolder}>Change Folder</MenuItem>
        <MenuItem onClick={handleClose}>About</MenuItem>
      </Menu>
    </>
  );
}
