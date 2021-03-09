import React, { useEffect, useRef, useState } from "react";
import { ButtonBase } from "@material-ui/core";
import Image from "material-ui-image";
import { getImageDataFromVideo } from "../../utils/getImageDataFromVideo";

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
      videoRef.current.currentTime = 0;
      const imgData = getImageDataFromVideo(videoRef.current);
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
      <div
        style={{
          position: "absolute",
          top: "-9999em",
          overflow: "hidden",
          width: 1,
          height: 1,
        }}
      >
        <video
          muted
          className="snapshot-generator"
          ref={videoRef}
          src={`safe-file-protocol://${file}`}
          onLoadedMetadata={() => setMetadataLoaded(true)}
          onLoadedData={() => setDataLoaded(dataLoaded)}
          onSuspend={() => setSuspended(suspended)}
          onSeeked={() => setSeeked(true)}
        ></video>
      </div>
    </ButtonBase>
  );
}
