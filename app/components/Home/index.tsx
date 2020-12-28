import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { remote } from 'electron';
import styles from './Home.css';
import { selectFiles, setNewDirectory } from '../../features/files/filesSlice';
import EditVideo from '../EditVideo';
import VideoThumb from '../VideoThumb';

const { dialog } = remote;

const re = new RegExp('([^/]+$)');

export default function Home(): JSX.Element {
  const dispatch = useDispatch();
  const videoFiles = useSelector(selectFiles);
  const [currentVideo, setCurrentVideo] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const FileBrowser = async () => {
    setLoading(true);
    const directory = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    setLoading(false);
    dispatch(setNewDirectory(directory.filePaths[0]));
  };

  if (currentVideo) {
    return (
      <EditVideo
        file={currentVideo}
        onClose={() => setCurrentVideo(undefined)}
      />
    );
  }

  return (
    <div className={styles.container} data-tid="container">
      <div>Video Tagger Rx</div>
      <div className={styles.sidebar}>
        <button onClick={FileBrowser} type="button">
          Open Folder
        </button>
        {loading && 'Loading...'}
        <div className={styles.videoContainer}>
          {videoFiles.data.map((file) => (
            <div
              key={file}
              className={styles.videoCard}
              onClick={() => setCurrentVideo(file)}
            >
              <div className={styles.videoCardTitle}>{re.exec(file)![0]}</div>
              <VideoThumb file={file} onClick={() => setCurrentVideo(file)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
