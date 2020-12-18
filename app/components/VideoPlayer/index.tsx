import React, { useEffect, useRef, VideoHTMLAttributes } from 'react';

import styles from './VideoPlayer.css';

type Props = VideoHTMLAttributes<HTMLVideoElement> & {
  file: string;
  play?: boolean;
  loadSeconds?: number;
};

export default function VideoPlayer({
  file,
  loadSeconds,
  onLoadedMetadata,
  onTimeUpdate,
  play = false,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef && videoRef.current) {
      videoRef.current.currentTime = Number(loadSeconds);
      if (play) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [play, videoRef, loadSeconds]);

  return (
    <div className={styles.videoContainer}>
      <video
        ref={videoRef}
        className={styles.video}
        width="420"
        height="280"
        controls
        preload="metadata"
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
      >
        <source src={`file://${file}#t=0.1`} />
        <track default kind="captions" srcLang="en" />
      </video>
    </div>
  );
}
