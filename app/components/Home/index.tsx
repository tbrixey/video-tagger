import React, { useEffect, useRef, useState } from 'react';
import { remote, ipcRenderer } from 'electron';
import { glob } from 'glob';
import { debounce } from 'lodash';
import styles from './Home.css';
import EditVideo from '../EditVideo';
import VideoThumb from '../VideoThumb';

const re = new RegExp('([^/]+$)');

export default function Home(): JSX.Element {
  const [hideThumbs, setHideThumbs] = useState(false);
  const [videoFiles, setVideoFiles] = useState<string[]>([]);
  const [searchedString, setSearchedString] = useState<string>('');
  const [openedFolder, setOpenedFolder] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const headerEl = useRef(null);

  useEffect(() => {
    ipcRenderer.on(
      'open-dialog-paths-selected',
      (_event, { canceled, filePaths }) => {
        const folder = filePaths[0];
        setOpenedFolder(!canceled);
        setLoading(true);
        if (folder) {
          setOpenedFolder(true);
          glob(`${folder}/**/*.{mp4,webm,mov}`, (_err, files) => {
            setVideoFiles(files);
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      }
    );
  }, []);

  const browseFiles = async () => {
    remote.getCurrentWindow().webContents.emit('show-open-dialog');
  };

  const handleSearch = debounce((value: string) => {
    setSearchedString(value.toLowerCase());
  }, 100);

  return (
    <div className={styles.container} data-tid="container">
      <div
        className={styles.header}
        ref={headerEl}
        onClick={() => setCurrentVideo(undefined)}
      >
        {currentVideo ? 'Back' : 'Video Tagger Rx'}
      </div>
      {loading && <>Loading...</>}
      <div className={styles.main}>
        {!openedFolder && (
          <div onClick={browseFiles}>
            <svg width="150" height="150" viewBox="0 0 18 18">
              <path d="M15 5h-5L8 3H3c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm-1 8H4V7h10v6z" />
            </svg>
          </div>
        )}

        {videoFiles.length > 0 && (
          <div className={styles.outerSearchContainer}>
            <div className={styles.searchContainer}>
              <form>
                <input
                  placeholder="Search..."
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </form>
            </div>
          </div>
        )}

        <div className={styles.videoContainer}>
          {videoFiles.map((file) => {
            const fileName = re.exec(file)![0];
            return (
              <div
                key={file}
                className={styles.videoCard}
                onClick={() => setCurrentVideo(file)}
                style={{
                  display:
                    file.toLowerCase().indexOf(searchedString) !== -1
                      ? 'block'
                      : 'none',
                }}
              >
                {hideThumbs ? (
                  <div
                    onClick={() => setCurrentVideo(file)}
                    style={{ wordBreak: 'break-all', color: '#000' }}
                  >
                    {fileName}
                  </div>
                ) : (
                  <VideoThumb
                    fileName={fileName}
                    file={file}
                    onClick={() => setCurrentVideo(file)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      {currentVideo && (
        <div className={styles.window}>
          <EditVideo file={currentVideo} />
        </div>
      )}
    </div>
  );
}
