import React, { useRef, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import styles from './EditVideo.css';
import EditNote from '../EditNote';

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
  const notesList =
    videoRef.current && videoRef.current.paused
      ? Object.keys({ [currentSeconds]: '', ...notes })
      : Object.keys(notes);
  // const transitions = useTransition(notesList, (item) => item, {
  //   from: { opacity: 0 },
  //   enter: { opacity: 1 },
  //   leave: { opacity: 0 },
  // });

  return (
    <div>
      <button type="button" onClick={onClose}>
        Done
      </button>
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
      <form>
        <div className={styles.list}>
          {notesList.map((sec) => {
            return (
              <EditNote
                current={currentSeconds === parseInt(sec)}
                key={sec}
                seconds={sec}
                value={notes[sec]}
                onChange={(value) => {
                  setNotes({
                    ...notes,
                    [sec]: value,
                  });
                }}
              />
            );
          })}
          {/* {transitions.map(({ item: sec, props, key }) => {
            return (
              <animated.div key={key} style={props}>
                <EditNote
                  current={currentSeconds === parseInt(sec)}
                  seconds={sec}
                  value={notes[sec]}
                  onChange={(value) => {
                    setNotes({
                      ...notes,
                      [sec]: value,
                    });
                  }}
                />
              </animated.div>
            );
          })} */}
        </div>
      </form>
    </div>
  );
}
