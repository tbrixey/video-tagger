import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import BitcoinIcon from "../../bitcoin-btc-logo.svg";
import { styled } from "@material-ui/core/styles";

const MyDialogText = styled(DialogContentText)({
  wordBreak: "break-all",
});

type Props = {
  onChangeFolder?: () => void;
};
export function MainMenu({ onChangeFolder }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [walletDialog, setWalletDialog] = React.useState(false);

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
        <MenuItem
          onClick={() => {
            setWalletDialog(true);
            setAnchorEl(null);
          }}
        >
          Donate <img src={BitcoinIcon} style={{ width: 24, marginLeft: 8 }} />
        </MenuItem>
      </Menu>
      <Dialog open={walletDialog} onClose={() => setWalletDialog(false)}>
        <DialogTitle>Wallet Addresses</DialogTitle>
        <DialogContent>
          <MyDialogText>
            <b>Bitcoin:</b> bc1qwgxtcwtcm2h3w0n4czng7sezlkhlvt3k97dujp
          </MyDialogText>
          <MyDialogText>
            <b>Ethereum:</b> 0x4d58C7Afe1e9532CABFd3844Af8b73F932f785BE
          </MyDialogText>
          <MyDialogText>
            <b>Cardano:</b>{" "}
            addr1q9eyt59jc3ljkmc20xp6husynec24gv8py8a07v2x4ke6fmjghgt93rl9dhs57vr40eqf8ns42scwzg06luc5dtdn5nsf44a74
          </MyDialogText>
          <MyDialogText>
            <b>Litecoin:</b> La6vGXnBnCi7wxi1rG6Q7TQrt9x8k7xP5H
          </MyDialogText>
          <MyDialogText>
            <b>Cosmos:</b> cosmos1vaqv3v7j9j0kqc3dw460x3e7ayl5r7srqyv58a
          </MyDialogText>
        </DialogContent>
      </Dialog>
    </>
  );
}
