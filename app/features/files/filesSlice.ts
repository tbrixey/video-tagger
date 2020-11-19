import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';

const initialState: { loading: boolean; data: any[] } = {
  loading: true,
  data: [],
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setFiles: (state, payload) => {
      state.data = payload.payload;
    },
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
  },
});

export const { setFiles, toggleLoading } = filesSlice.actions;

export default filesSlice.reducer;

export const selectFiles = (state: RootState) => state.files;
