import React, { useEffect, useState } from 'react';
import { remote } from 'electron';
import { glob } from 'glob';
import styles from './Home.css';
import EditVideo from '../EditVideo';
import VideoThumb from '../VideoThumb';

const { dialog } = remote;

const re = new RegExp('([^/]+$)');

export default function Home(): JSX.Element {
  const [videoFiles, setVideoFiles] = useState<string[]>([]);
  const [currentVideo, setCurrentVideo] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const FileBrowser = async () => {
    const directory = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    setLoading(true);
    glob(`${directory.filePaths[0]}/**/*.{mp4,webm,mov}`, (_err, files) => {
      setVideoFiles(files);
      setLoading(false);
    });
  };

  return (
    <div className={styles.container} data-tid="container">
      <div className={styles.header}>
        Video Tagger Rx
        <button onClick={FileBrowser} type="button">
          Open Folder
        </button>
      </div>
      {loading && <>Loading...</>}
      <div className={styles.main}>
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
          <EditVideo
            file={currentVideo}
            onClose={() => setCurrentVideo(undefined)}
          />
        </div>
      )}
    </div>
  );
}
