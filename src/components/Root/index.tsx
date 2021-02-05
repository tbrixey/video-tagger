import React, { useEffect, useRef, useState } from "react";
import { ipcRenderer, glob } from "../../appRuntime";
import EditVideo from "../EditVideo";
import VideoThumb from "../VideoThumb";
import styled from "styled-components";
import "./global.css";
import { debounce } from "lodash";

const re = new RegExp("([^/]+$)");

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.div`
  padding: 10px;
  background: #00000044;
  width: 100%;
  box-sizing: border-box;
  -webkit-app-region: drag;
  text-align: center;
  cursor: pointer;
`;

const Main = styled.div`
  overflow: auto;
  flex: 1;
  width: 100%;
  position: relative;
  background: #eee;
`;

const Window = styled.div`
  position: absolute;
  top: 38px;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 2;
  background: #111d2e;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
`;

const VideoCard = styled.div`
  width: 33.3%;
  padding: 10px;
  box-sizing: border-box;
`;

const OuterSearchContainer = styled.div`
  padding: 8px;
`;

const SearchContainer = styled.div`
  width: 100%;
`;

const SearchForm = styled.form`
  border: 1px solid #00000033;
  display: flex;
  padding: 2px;
`;

const SearchInput = styled.input`
  padding: 8px;
  background-color: transparent;
  color: black;
  width: 100%;
  display: block;
  box-sizing: border-box;
  border: none;
`;

export default function Home(): JSX.Element {
  const [videoFiles, setVideoFiles] = useState<string[]>([]);
  const [searchedString, setSearchedString] = useState("");
  const [openedFolder, setOpenedFolder] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const headerEl = useRef(null);

  useEffect(() => {
    ipcRenderer.on("open-file-dialog-reply", (event, { canceled, path }) => {
      setOpenedFolder(!canceled);
      setLoading(true);
      if (path) {
        setOpenedFolder(true);
        glob(`${path}/**/*.{mp4,webm,mov}`, (_err: any, files: any) => {
          setVideoFiles(files);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, []);

  const browseFiles = async () => {
    ipcRenderer.send("open-file-dialog");
  };

  const handleSearch = debounce((value: string) => {
    setSearchedString(value.toLowerCase());
  }, 100);

  return (
    <>
      <Container data-tid="container">
        <Header ref={headerEl} onClick={() => setCurrentVideo(undefined)}>
          {currentVideo ? "Back" : "Video Tagger Rx"}
        </Header>
        {loading && <>Loading...</>}
        <Main>
          {!openedFolder && (
            <div onClick={browseFiles}>
              <svg width="150" height="150" viewBox="0 0 18 18">
                <path d="M15 5h-5L8 3H3c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm-1 8H4V7h10v6z" />
              </svg>
            </div>
          )}

          {videoFiles.length > 0 && (
            <OuterSearchContainer>
              <SearchContainer>
                <SearchForm>
                  <SearchInput
                    placeholder="Search..."
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </SearchForm>
              </SearchContainer>
            </OuterSearchContainer>
          )}

          <VideoContainer>
            {videoFiles.map((file) => {
              const fileName = re.exec(file)![0];
              return (
                <VideoCard
                  style={{
                    display:
                      file.toLowerCase().indexOf(searchedString) !== -1
                        ? "block"
                        : "none",
                  }}
                  key={file}
                  onClick={() => setCurrentVideo(file)}
                >
                  <VideoThumb
                    fileName={fileName}
                    file={file}
                    onClick={() => setCurrentVideo(file)}
                  />
                </VideoCard>
              );
            })}
          </VideoContainer>
        </Main>
        {currentVideo && (
          <Window>
            <EditVideo file={currentVideo} />
          </Window>
        )}
      </Container>
    </>
  );
}
