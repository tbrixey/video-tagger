import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import fs from 'fs';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Home.css';
import {
  selectFiles,
  setFiles,
  toggleLoading,
} from '../features/files/filesSlice';

export default function Home(): JSX.Element {
  const dispatch = useDispatch();
  const videoFiles = useSelector(selectFiles);
  useEffect(() => {
    fs.readdir(
      'C:/Users/brixe/Documents/Stream/After Effects/Projects/transition_AME',
      (err, files) => {
        console.log(files);
        const videos = files.filter((file) => {
          if (file.endsWith('webm')) return true;
        });
        dispatch(setFiles(videos));
        dispatch(toggleLoading());
      }
    );
  }, []);

  return (
    <div className={styles.container} data-tid="container">
      <div>Video Tagger Rx</div>
      <div className={styles.videoContainer}>
        {videoFiles.loading && <div>Loading...</div>}
        {videoFiles.data.map((file) => (
          <div key={file} className={styles.videoCard}>
            <div>
              <div>{file}</div>
              <video width="420" height="280" controls preload="metadata">
                <source
                  src={`file://C:/Users/brixe/Documents/Stream/After Effects/Projects/transition_AME/${file}#t=1`}
                  type="video/webm"
                />
                <track />
              </video>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
