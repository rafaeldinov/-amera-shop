import { createSlice } from '@reduxjs/toolkit';
import { fetchCamerasAction } from '../api-action';
import { Camera } from '../../types/camera';
import { SHOW_ITEMS_PER_PAGE_BEGIN_COUNT, SHOW_ITEMS_PER_PAGE_COUNT } from '../../const';

type InitialState = {
  cameras: Camera[];
  showingCamerasBeginCount: number;
  activePageCameras: Camera[];
  activePaginationNumber: number
}

const initialState: InitialState = {
  cameras: [],
  activePageCameras: [],
  showingCamerasBeginCount: SHOW_ITEMS_PER_PAGE_BEGIN_COUNT,
  activePaginationNumber: 1
};

export const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    changeActivePaginationPage: (state, action) => {
      state.activePaginationNumber = action.payload;
      state.activePageCameras = state.cameras.slice(
        SHOW_ITEMS_PER_PAGE_COUNT * action.payload - SHOW_ITEMS_PER_PAGE_COUNT, SHOW_ITEMS_PER_PAGE_COUNT * action.payload
      );
      console.log(state.activePageCameras);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        console.log();
        state.cameras = action.payload;
        state.activePageCameras = state.cameras.slice(SHOW_ITEMS_PER_PAGE_BEGIN_COUNT, SHOW_ITEMS_PER_PAGE_COUNT);
      });
  }
});

export const { changeActivePaginationPage } = cameraSlice.actions;
