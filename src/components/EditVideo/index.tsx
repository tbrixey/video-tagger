import React, { useEffect, useRef, useState } from "react";
import { omit } from "lodash";
import EditNote from "../EditNote";
import { saveNotes, readNotes } from "../../utils/notes";
import { Divider, makeStyles } from "@material-ui/core";
import { VideoProgressBar } from "../VideoProgressBar";
import { Video } from "./Video";
import { PlaybackMenu } from "./PlaybackMenu";

type Props = {
  file: string;
};

type NoteState = {
  [seconds: string]: string;
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    flexFlow: "column nowrap",
  },
  videoSection: {
    flex: 1,
  },
  notesSection: {
    flex: 1,
    position: "relative",
  },
  videoContainer: {
    height: "100%",
    position: "relative",
  },
  form: {
    height: "100%",
    overflow: "auto",
    width: "100%",
    position: "absolute",
  },
});

export default function EditVideo({ file }: Props) {
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [notes, setNotes] = useState<NoteState>({});
  const [duration, setDuration] = useState<number | undefined>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const notesList = Object.keys({ [currentSeconds]: "", ...notes });
  const classes = useStyles();

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
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setCurrentSeconds(Number(sec));
    if (videoRef && videoRef.current) {
      videoRef.current.currentTime = Number(sec);
    }
  };

  const setPlaybackSpeed = (playBackSpeed: number) => {
    if (videoRef && videoRef.current) {
      videoRef.current.playbackRate = playBackSpeed;
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.videoSection}>
        <div className={classes.videoContainer}>
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
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <VideoProgressBar
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
        <PlaybackMenu
          initialSpeed={videoRef.current?.playbackRate || 1}
          onChange={(s) => setPlaybackSpeed(s)}
        />
      </div>
      <Divider />
      <div className={classes.notesSection}>
        <form action="#" className={classes.form}>
          {notesList.map((sec) => {
            return (
              <EditNote
                current={currentSeconds === Number(sec)}
                key={sec}
                seconds={sec}
                value={notes[sec]}
                helpText="↵ to ▶ / ❚❚"
                onTimeClick={() => {
                  setToCurrentTime(sec);
                  // setTimeout(() => {
                  //   if (videoRef.current) {
                  //     const imageData = getImageDataFromVideo(videoRef.current);
                  //     const element = document.createElement("a");
                  //     element.href = imageData;
                  //     element.download = "test.png";
                  //     element.click();
                  //   }
                  // }, 1000);
                }}
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
      </div>
    </div>
  );
}
