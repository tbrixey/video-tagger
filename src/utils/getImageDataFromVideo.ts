export function getImageDataFromVideo(video: HTMLVideoElement) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.height = video.videoHeight;
  canvas.width = video.videoWidth;

  if (ctx) {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  }

  canvas.remove();
  return canvas.toDataURL("image/png");
}