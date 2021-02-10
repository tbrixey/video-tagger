import React, { useEffect, useRef, useState } from "react";
import { ButtonBase } from "@material-ui/core";
import Image from "material-ui-image";

type Props = {
  file: string;
  onClick: () => void;
};

export function VideoThumb({ file, onClick }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [metadataLoaded, setMetadataLoaded] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [suspended, setSuspended] = useState(false);
  const [seeked, setSeeked] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (metadataLoaded && videoRef && videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      video.currentTime = 0;
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;

      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
      const imgData = canvas.toDataURL();
      if (imgData && imgData !== "data:,") {
        setImage(imgData);
      }
    }
  }, [metadataLoaded, dataLoaded, suspended, videoRef, seeked]);

  return (
    <ButtonBase onClick={onClick}>
      <Image
        disableSpinner
        src={image || process.env.PUBLIC_URL + "/empty.png"}
        alt=""
        cover
        style={{ width: 50, paddingTop: "calc(70%)" }}
      />
      <video
        style={{
          position: "absolute",
          top: "-9999em",
        }}
        muted
        className="snapshot-generator"
        ref={videoRef}
        src={`safe-file-protocol://${file}`}
        onLoadedMetadata={() => setMetadataLoaded(true)}
        onLoadedData={() => setDataLoaded(dataLoaded)}
        onSuspend={() => setSuspended(suspended)}
        onSeeked={() => setSeeked(true)}
      ></video>
    </ButtonBase>
  );
}
