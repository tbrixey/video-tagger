import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { remote } from 'electron';
import styles from './Home.css';
import { selectFiles, setNewDirectory } from '../features/files/filesSlice';

const { dialog } = remote;

export default function Home(): JSX.Element {
  const dispatch = useDispatch();
  const videoFiles = useSelector(selectFiles);
  useEffect(() => {}, []);

  const FileBrowser = async () => {
    const directory = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    dispatch(setNewDirectory(directory.filePaths[0]));
  };

  return (
    <div className={styles.container} data-tid="container">
      <div>Video Tagger Rx</div>
      <button onClick={FileBrowser} type="button">
        Open Folder
      </button>
      <div className={styles.videoContainer}>
        {videoFiles.data.map((file) => (
          <div key={file} className={styles.videoCard}>
            <div>
              <div>{file}</div>
              <video width="420" height="280" controls preload="metadata">
                <source src={`file://${file}#t=0.1`} />
                <track default kind="captions" srcLang="en" />
              </video>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
