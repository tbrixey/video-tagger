import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";

type Props = {
  onChangeFolder?: () => void;
};
export function MainMenu({ onChangeFolder }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [aboutOpen, setAboutOpen] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAboutOpen = () => {
    setAboutOpen(true);
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
        <MenuItem onClick={handleAboutOpen}>About</MenuItem>
      </Menu>
      <Dialog open={aboutOpen} onClose={() => setAboutOpen(false)}>
        <DialogTitle>About</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Just something I find useful when working on raw footage. Wanted to
            share it with the world.
          </DialogContentText>
          <DialogContentText>
            Check out my other apps and things https://trevorbrixey.com
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAboutOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
