import React, { useEffect, useRef, useState } from 'react';
import styles from './EditVideo.css';
import EditNote from '../EditNote';
import VideoPlayer from '../VideoPlayer';
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
  const [loadSeconds, setLoadSeconds] = useState(0);
  const [notes, setNotes] = useState<NoteState>({});
  const [playVideo, setPlayVideo] = useState(false);
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
      <VideoPlayer
        play={playVideo}
        file={file}
        loadSeconds={loadSeconds}
        onLoadedMetadata={(event) => {
          setCurrentSeconds(Math.floor(event.currentTarget.currentTime));
        }}
        onTimeUpdate={(event) => {
          setCurrentSeconds(Math.floor(event.currentTarget.currentTime));
        }}
      />
      <form className={styles.list}>
        {notesList.map((sec) => {
          return (
            <EditNote
              current={currentSeconds === Number(sec)}
              key={sec}
              seconds={sec}
              value={notes[sec]}
              onTimeClick={() => {
                setLoadSeconds(Number(sec));
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  setPlayVideo(!playVideo);
                }
              }}
              onChange={(value) => {
                setPlayVideo(false);
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
