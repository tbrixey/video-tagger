import { useEffect, useState } from "react";
import { ipcRenderer, glob } from "../appRuntime";

type State = {
  openedFolder: boolean;
  loading: boolean;
  videoFiles: string[];
};

export function useBrowseFiles() {
  const defaultState = {
    openedFolder: false,
    loading: false,
    videoFiles: [],
  };

  const [{ openedFolder, loading, videoFiles }, setState] =
    useState<State>(defaultState);

  useEffect(() => {
    ipcRenderer.on("open-file-dialog-reply", (event, { canceled, path }) => {
      setState((s) => ({
        ...s,
        loading: true,
        openedFolder: !canceled,
      }));
      if (path) {
        glob(`${path}/**/*.{mp4,webm,mov,mkv}`, (_err: any, files: any) => {
          setState((s) => ({
            videoFiles: files,
            loading: false,
            openedFolder: true,
          }));
        });
      } else {
        setState((s) => ({
          ...s,
          loading: false,
        }));
      }
    });
  }, []);

  const browseFiles = async () => {
    ipcRenderer.send("open-file-dialog");
  };

  return {
    browseFiles,
    openedFolder,
    loading,
    videoFiles,
  };
}
