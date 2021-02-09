import {
  TableContainer,
  TableRow,
  Paper,
  TableCell,
  Table,
  TableBody,
} from "@material-ui/core";
import { getFilenameFromPath } from "../../utils/getFilenameFromPath";
import { getFilenameStats } from "../../utils/getFilenameStats";
import { VideoThumb } from "../VideoThumb";

type Props = {
  files: string[];
  filterString?: string;
  onFileClick?: (filename: string) => void;
};

export function FileBrowser({ files, onFileClick, filterString = "" }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {files.map((file) => {
            const fileName = getFilenameFromPath(file);
            const { birthtime } = getFilenameStats(file);
            return (
              <TableRow
                key={file}
                style={{
                  display:
                    file.toLowerCase().indexOf(filterString) !== -1
                      ? ""
                      : "none",
                }}
              >
                <TableCell width={80}>
                  <VideoThumb
                    file={file}
                    onClick={() => onFileClick && onFileClick(file)}
                  />
                </TableCell>
                <TableCell>{fileName}</TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {birthtime.toLocaleString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
