import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import fs from 'fs';
import glob from 'glob';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';

const initialState: {
  data: any[];
  directory: string;
  selectedVideoClip: string;
} = {
  data: [],
  directory: '',
  selectedVideoClip: '',
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setFiles: (state, { payload }) => {
      state.data = payload;
    },
    setDirectory: (state, { payload }) => {
      state.directory = payload;
    },
  },
});

export const { setFiles, setDirectory } = filesSlice.actions;

export const setNewDirectory = (directory: string): AppThunk => (dispatch) => {
  glob(`${directory}/**/*.{mp4,webm,mov}`, (err, files) => {
    dispatch(setFiles(files));
  });

  // fs.readdir(directory, (err, files) => {
  //   const videos = files.filter((file) => {
  //     if (file.endsWith('mp4')) return true;
  //   });

  //   dispatch(setFiles(videos));
  // });

  dispatch(setDirectory(directory));
};

export default filesSlice.reducer;

export const selectFiles = (state: RootState) => state.files;
