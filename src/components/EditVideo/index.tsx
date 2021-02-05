import React, { useEffect, useRef, useState } from "react";
import { omit } from "lodash";
import EditNote from "../EditNote";
import { saveNotes, readNotes } from "../../utils/notes";
import styled from "styled-components";

type Props = {
  file: string;
};

type NoteState = {
  [seconds: string]: string;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const VideoContainer = styled.div`
  padding-bottom: 56.25%;
  position: relative;
`;

const FormList = styled.form`
  overflow: auto;
  height: 100%;
`;

const Video = styled.video`
  width: 100%;
  position: absolute;
  height: 100%;
  outline: none;
  &::-webkit-media-controls-fullscreen-button {
    display: none;
  }
  &::-webkit-media-controls-timeline::-webkit-media-slider-container {
    background: red; /* works */
  }
  &::-webkit-media-controls-panel {
    display: flex !important;
    opacity: 1 !important;
  }
`;

export default function EditVideo({ file }: Props) {
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [notes, setNotes] = useState<NoteState>({});
  const videoRef = useRef<HTMLVideoElement>(null);
  const notesList = Object.keys({ [currentSeconds]: "", ...notes });

  useEffect(() => {
    setNotes(readNotes(file));
  }, [file]);

  useEffect(() => {
    saveNotes(notes, file);
  }, [notes, file]);

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
    <Container>
      <VideoContainer>
        <Video
          ref={videoRef}
          width="420"
          height="280"
          controls
          muted
          preload="metadata"
          onLoadedMetadata={(event) => {
            setCurrentSeconds(Math.floor(event.currentTarget.currentTime));
          }}
          onTimeUpdate={(event) => {
            setCurrentSeconds(Math.floor(event.currentTarget.currentTime));
          }}
        >
          <source src={`safe-file-protocol://${file}`} />
          <track default kind="captions" srcLang="en" />
        </Video>
      </VideoContainer>
      <FormList>
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
                if (e.key === "Enter") {
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
              removeNote={(seconds: string) => {
                setNotes((prevNotes) => omit(prevNotes, [seconds]));
              }}
            />
          );
        })}
      </FormList>
    </Container>
  );
}
