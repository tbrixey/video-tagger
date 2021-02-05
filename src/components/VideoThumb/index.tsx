import React, { useRef } from "react";
import styled from "styled-components";

type Props = {
  file: string;
  fileName?: string;
  onClick: () => void;
};

const VideoContainer = styled.div`
  padding-bottom: 100%;
  position: relative;
  background: #00000033;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  &:hover {
    opacity: 0.8;
    box-shadow: 2px 2px 6px #00000033;
  }
`;

const Video = styled.video`
  width: 100%;
  position: absolute;
  height: 100%;
  outline: none;
  object-fit: cover;
`;

const Filename = styled.div`
  background: #00000055;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2px 6px;
  color: white;
  font-size: 9px;
`;

export default function VideoThumb({ file, fileName, onClick }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <VideoContainer
      onMouseOver={() => {
        videoRef.current?.play();
      }}
      onMouseOut={() => {
        videoRef.current?.pause();
      }}
      onClick={onClick}
    >
      <Video ref={videoRef} width="100" height="100" muted>
        <source src={`safe-file-protocol://${file}`} />
        <track default kind="captions" srcLang="en" />
      </Video>
      <Filename>{fileName}</Filename>
    </VideoContainer>
  );
}
