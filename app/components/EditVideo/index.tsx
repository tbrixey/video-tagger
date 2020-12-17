import React, { useEffect, useRef, useState } from 'react';
import styles from './EditVideo.css';
import EditNote from '../EditNote';
import { saveNotes, readNotes } from '../../utils/notes';

type Props = {
  file: string;
  onClose: () => void;
};

type NoteState = {
  [seconds: string]: string;
};

export default function EditVideo({ file, onClose }: Props) {
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [notes, setNotes] = useState<NoteState>({});
  const [paused, setPaused] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const notesList = paused
    ? Object.keys({ [currentSeconds]: '', ...notes })
    : Object.keys(notes);

  useEffect(() => {
    if (videoRef && videoRef.current) {
      setPaused(videoRef.current ? videoRef.current.paused : true);
    }
    setNotes(readNotes(file));
  }, []);

  const saveNotesToFS = () => {
    saveNotes(notes, file);
  };

  const closeVideo = () => {
    onClose();
  };

  return (
    <div className={styles.root}>
      <div>
        <button
          type="button"
          onClick={saveNotesToFS}
          style={{ marginRight: 8 }}
        >
          Save
        </button>
        <button type="button" onClick={closeVideo}>
          Close
        </button>
      </div>
      <div className={styles.videoContainer}>
        <video
          ref={videoRef}
          className={styles.video}
          width="420"
          height="280"
          controls
          preload="metadata"
          onLoadedMetadata={(event) => {
            setCurrentSeconds(Math.floor(event.currentTarget.currentTime));
          }}
          onTimeUpdate={(event) => {
            setCurrentSeconds(Math.floor(event.currentTarget.currentTime));
          }}
        >
          <source src={`file://${file}#t=0.1`} />
          <track default kind="captions" srcLang="en" />
        </video>
      </div>
      <form className={styles.list}>
        {notesList.map((sec) => {
          return (
            <EditNote
              current={currentSeconds === Number(sec)}
              key={sec}
              seconds={sec}
              value={notes[sec]}
              onTimeClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = Number(sec);
                }
              }}
              onChange={(value) => {
                setNotes({
                  ...notes,
                  [sec]: value,
                });
              }}
            />
          );
        })}
      </form>
    </div>
  );
}
