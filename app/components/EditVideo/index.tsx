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
  const videoRef = useRef<HTMLVideoElement>(null);
  const notesList = Object.keys({ [currentSeconds]: '', ...notes });

  useEffect(() => {
    setNotes(readNotes(file));
  }, [file]);

  const saveNotesToFS = () => {
    saveNotes(notes, file);
  };

  const closeVideo = () => {
    onClose();
  };

  const togglePlayback = () => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };

  const setToCurrentTime = (sec: string) => {
    togglePlayback();
    setCurrentSeconds(Number(sec));
    if (videoRef && videoRef.current) {
      videoRef.current.currentTime = Number(sec);
    }
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
              helpText="↵ to ▶ / ❚❚"
              onTimeClick={() => setToCurrentTime(sec)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  togglePlayback();
                }
              }}
              onChange={(value) => {
                videoRef.current?.pause();
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
