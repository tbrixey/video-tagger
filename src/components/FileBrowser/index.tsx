import {
  TableContainer,
  TableRow,
  Paper,
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableSortLabel,
} from "@material-ui/core";
import { getFilenameFromPath } from "../../utils/getFilenameFromPath";
import { getFilenameStats } from "../../utils/getFilenameStats";
import { VideoThumb } from "../VideoThumb";
import { orderBy } from "lodash";
import { useState } from "react";

type Props = {
  files: string[];
  filterString?: string;
  onFileClick?: (filename: string) => void;
};

export function FileBrowser({ files, onFileClick, filterString = "" }: Props) {
  const [sortBy, setSortBy] = useState("fileName");
  const [sortAsc, setSortAsc] = useState(true);

  const mappedFiles = files.map((file) => ({
    file,
    fileName: getFilenameFromPath(file),
    date: getFilenameStats(file).birthtime,
    show: file.toLowerCase().indexOf(filterString) !== -1,
  }));

  return (
    <TableContainer style={{ height: "100%" }} component={Paper}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <TableSortLabel
                active={sortBy === "fileName"}
                direction={sortAsc ? "asc" : "desc"}
                onClick={() => {
                  setSortBy("fileName");
                  setSortAsc(!sortAsc);
                }}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === "date"}
                direction={sortAsc ? "asc" : "desc"}
                onClick={() => {
                  setSortBy("date");
                  setSortAsc(!sortAsc);
                }}
              >
                Date
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderBy(mappedFiles, [sortBy], [sortAsc ? "asc" : "desc"]).map(
            ({ file, fileName, date, show }) => {
              return (
                <TableRow
                  key={file}
                  style={{
                    display: show ? "" : "none",
                  }}
                >
                  <TableCell width={80}>
                    <VideoThumb
                      file={file}
                      onClick={() => onFileClick && onFileClick(file)}
                    />
                  </TableCell>
                  <TableCell
                    style={{ cursor: "pointer" }}
                    onClick={() => onFileClick && onFileClick(file)}
                  >
                    {fileName}
                  </TableCell>
                  <TableCell style={{ whiteSpace: "nowrap" }}>
                    {date.toLocaleString()}
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
