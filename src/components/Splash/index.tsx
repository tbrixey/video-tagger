import { Button, Grid } from "@material-ui/core";
import { Logo } from "../Logo";
import FolderIcon from "@material-ui/icons/Folder";

type Props = {
  onBrowseFiles?: () => void;
};
export function Splash({ onBrowseFiles }: Props) {
  return (
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
  );
}
