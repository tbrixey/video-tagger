import React, { ReactNode } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Logo } from "../Logo";

type Props = {
  children?: ReactNode;
  renderMenu?: ReactNode;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function FileBar({ children, renderMenu }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {renderMenu}
          <div className={classes.title}>
            <Logo
              style={{
                width: 70,
                display: "block",
              }}
            />
          </div>
          {children}
        </Toolbar>
      </AppBar>
    </div>
  );
}
