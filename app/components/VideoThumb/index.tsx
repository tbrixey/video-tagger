import React, { useRef } from 'react';
import styles from './VideoThumb.css';

type Props = {
  file: string;
  onClick: () => void;
};

export default function VideoThumb({ file, onClick }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className={styles.videoContainer}
      onMouseOver={() => {
        videoRef.current?.play();
      }}
      onMouseOut={() => {
        videoRef.current?.pause();
      }}
      onClick={onClick}
    >
      <video ref={videoRef} className={styles.video} width="100" height="100">
        <source src={`file://${file}#t=0.1`} />
        <track default kind="captions" srcLang="en" />
      </video>
    </div>
  );
}
