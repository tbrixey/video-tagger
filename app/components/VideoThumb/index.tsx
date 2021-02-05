import React, { useRef, useState } from 'react';
import { useInViewEffect } from 'react-hook-inview';
import styles from './VideoThumb.css';

type Props = {
  file: string;
  fileName?: string;
  onClick: () => void;
};

export default function VideoThumb({ file, fileName, onClick }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const ref = useInViewEffect(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
      }
      setIsVisible(entry.isIntersecting);
    },
    { threshold: 1 }
  );

  return (
    <div
      ref={ref}
      className={styles.videoContainer}
      onMouseOver={() => {
        videoRef.current?.play();
      }}
      onMouseOut={() => {
        videoRef.current?.pause();
      }}
      onClick={onClick}
    >
      {isVisible && (
        <video ref={videoRef} className={styles.video} width="100" height="100">
          <source src={`file://${file}#t=0.1`} />
          <track default kind="captions" srcLang="en" />
        </video>
      )}
      <div className={styles.fileName}>{fileName}</div>
    </div>
  );
}
