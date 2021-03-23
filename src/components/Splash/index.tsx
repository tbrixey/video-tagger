import { Button, Grid } from "@material-ui/core";
import { Logo } from "../Logo";
import FolderIcon from "@material-ui/icons/Folder";
import styled from "styled-components";

const appVersion = window.require("electron").remote.app.getVersion();

type Props = {
  onBrowseFiles?: () => void;
};

const Main = styled.div`
  padding: 70px 10px 10px;
  position: relative;
  height: 100%;
`;

export function Splash({ onBrowseFiles }: Props) {
  console.log("VERSION", process.env.npm_package_version);
  return (
    <Main>
      <Grid
        container
        spacing={2}
        direction="column"
        justify="center"
        alignItems="center"
        style={{ height: "100%" }}
      >
        <Grid item>
          <Logo
            style={{
              width: 200,
            }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            size="large"
            onClick={onBrowseFiles}
            startIcon={<FolderIcon />}
            color="secondary"
          >
            Choose Folder
          </Button>
        </Grid>
      </Grid>
      <div>version: {appVersion}</div>
    </Main>
  );
}
