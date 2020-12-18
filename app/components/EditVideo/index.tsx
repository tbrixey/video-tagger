import React, { useRef, useState } from 'react';
import styles from './EditVideo.css';
import EditNote from '../EditNote';
import VideoPlayer from '../VideoPlayer';

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
  const [playVideo, setPlayVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const notesList = Object.keys({ [currentSeconds]: '', ...notes });

  return (
    <div className={styles.root}>
      <div>
        <button type="button" onClick={onClose}>
          Save
        </button>
      </div>
      <VideoPlayer
        play={playVideo}
        file={file}
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
                if (videoRef.current) {
                  videoRef.current.currentTime = Number(sec);
                }
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
