import React, { useEffect, useRef, useState } from 'react';
import { remote, ipcRenderer } from 'electron';
import { glob } from 'glob';
import styles from './Home.css';
import EditVideo from '../EditVideo';
import VideoThumb from '../VideoThumb';

const re = new RegExp('([^/]+$)');

export default function Home(): JSX.Element {
  const [videoFiles, setVideoFiles] = useState<string[]>([]);
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

  return (
    <div className={styles.container} data-tid="container">
      <div
        className={styles.header}
        ref={headerEl}
        onClick={() => setCurrentVideo(undefined)}
      >
        Video Tagger Rx
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

        <div className={styles.videoContainer}>
          {videoFiles.map((file) => (
            <div
              key={file}
              className={styles.videoCard}
              onClick={() => setCurrentVideo(file)}
            >
              <VideoThumb
                fileName={re.exec(file)![0]}
                file={file}
                onClick={() => setCurrentVideo(file)}
              />
            </div>
          ))}
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
