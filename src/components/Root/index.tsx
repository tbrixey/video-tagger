import React, { useState } from "react";
import EditVideo from "../EditVideo";
import styled from "styled-components";
import { debounce } from "lodash";
import { IconButton, Box } from "@material-ui/core";
import FileBar from "../FileBar";
import FileBarSearch from "../FileBar/Search";
import { MainMenu } from "../MainMenu";
import { useBrowseFiles } from "../../utils/useBrowseFiles";
import { FileBrowser } from "../FileBrowser";
import { getFilenameFromPath } from "../../utils/getFilenameFromPath";
import { Splash } from "../Splash";
import BackIcon from "@material-ui/icons/ArrowBack";

const Main = styled.div`
  padding: 70px 10px 10px;
  position: relative;
  z-index: 1;
  height: 100%;
`;

export default function Root(): JSX.Element {
  const [searchedString, setSearchedString] = useState("");
  const [currentVideo, setCurrentVideo] = useState<string | undefined>();
  const { browseFiles, openedFolder, loading, videoFiles } = useBrowseFiles();

  const handleSearch = debounce((value: string) => {
    setSearchedString(value.toLowerCase());
  }, 100);

  if (!openedFolder) {
    return <Splash onBrowseFiles={browseFiles} />;
  }

  return (
    <>
      <FileBar
        renderMenu={
          currentVideo ? (
            <IconButton edge="start" onClick={() => setCurrentVideo(undefined)}>
              <BackIcon />
            </IconButton>
          ) : (
            <MainMenu onChangeFolder={browseFiles} />
          )
        }
      >
        {!currentVideo ? (
          <FileBarSearch onChange={(v) => handleSearch(v)} />
        ) : (
          <Box
            component="div"
            textOverflow="ellipsis"
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              width: "70%",
              textAlign: "right",
            }}
          >
            {getFilenameFromPath(currentVideo)}
          </Box>
        )}
      </FileBar>
      <Main>
        {loading ? (
          "Loading Files..."
        ) : (
          <div style={{ display: currentVideo ? "none" : "block" }}>
            <FileBrowser
              files={videoFiles}
              onFileClick={(file) => setCurrentVideo(file)}
              filterString={searchedString}
            />
          </div>
        )}
        {currentVideo && <EditVideo file={currentVideo} />}
      </Main>
    </>
  );
}
