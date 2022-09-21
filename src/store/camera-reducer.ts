import { createSlice } from '@reduxjs/toolkit';
import { fetchCamerasAction } from './api-action';
import { Camera } from '../types/camera';

type InitialState = {
  cameras: Camera[];
}

const initialState: InitialState = {
  cameras: []
};

export const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
      });
  }
});
