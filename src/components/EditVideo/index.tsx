import React, { useEffect, useRef, useState } from "react";
import { omit } from "lodash";
import EditNote from "../EditNote";
import { saveNotes, readNotes } from "../../utils/notes";
import styled from "styled-components";
import { Button, Slider, Tooltip, withStyles } from "@material-ui/core";
import { formatSeconds } from "../../utils/formatSeconds";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { playbackSpeeds } from "./constants";

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
  flex-flow: column nowrap;
`;

const TopSection = styled.div`
  flex: 0 0 6%;
`;

const VideoSection = styled.div`
  flex: 1;
`;

const NotesSection = styled.div`
  flex: 1;
  position: relative;
`;

const VideoContainer = styled.div`
  height: 100%;
  position: relative;
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

const TrackSlider = withStyles({
  root: {
    height: 2,
    padding: "15px 0",
    background: "rgba(255,255,255,.15)",
    boxShadow: "inset 0 0 14px rgba(0,0,0,.2)",
  },
  valueLabel: {
    left: "calc(-50% + 12px)",
    top: -22,
    "& *": {
      background: "transparent",
      color: "#000",
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
  mark: {
    backgroundColor: "#bfbfbf",
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: "currentColor",
  },
  marked: {
    marginBottom: 0,
  },
})(Slider);

export default function EditVideo({ file }: Props) {
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [notes, setNotes] = useState<NoteState>({});
  const [duration, setDuration] = useState<number | undefined>();
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

  const setPlaybackSpeed = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    const playBackSpeed: any = event.target.value;
    if (videoRef && videoRef.current) {
      videoRef.current.playbackRate = playBackSpeed;
    }
  };

  return (
    <Container>
      <TopSection>
        <FormControl>
          <InputLabel>Playback Speed</InputLabel>
          <Select
            style={{ width: 120 }}
            defaultValue={1}
            onChange={setPlaybackSpeed}
          >
            {playbackSpeeds.map((speed) => (
              <MenuItem value={speed}>{speed}x</MenuItem>
            ))}
          </Select>
        </FormControl>
      </TopSection>
      <VideoSection>
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
              setDuration(event.currentTarget.duration);
            }}
            onTimeUpdate={(event) => {
              setCurrentSeconds(Math.floor(event.currentTarget.currentTime));
            }}
          >
            <source src={`safe-file-protocol://${file}`} />
            <track default kind="captions" srcLang="en" />
          </Video>
        </VideoContainer>
      </VideoSection>
      <TrackSlider
        color="secondary"
        getAriaValueText={(v) => `%${v}`}
        valueLabelDisplay="off"
        value={videoRef.current?.currentTime || 0}
        onChange={(_e, value) => {
          if (videoRef && videoRef.current && typeof value === "number") {
            videoRef.current.currentTime = value;
          }
        }}
        min={0}
        max={duration}
        marks={notesList.map((sec) => ({
          value: parseInt(sec),
          // label: (
          //   <Tooltip title={formatSeconds(sec)}>
          //     <div
          //       style={{
          //         width: 4,
          //         height: 4,
          //         background: "red",
          //         borderRadius: "50%",
          //       }}
          //     />
          //   </Tooltip>
          // ),
        }))}
      />
      <NotesSection>
        <form
          action="#"
          style={{
            height: "100%",
            overflow: "auto",
            width: "100%",
            position: "absolute",
          }}
        >
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
                    e.preventDefault();
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
        </form>
      </NotesSection>
    </Container>
  );
}
