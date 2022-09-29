import { createSlice } from '@reduxjs/toolkit';
import { fetchCamerasAction, fetchPageCamerasAction,fetchCameraAction, fetchPromoAction, fetchSimilarAction } from '../api-action';
import { Camera } from '../../types/camera';
import { Promo } from '../../types/promo';

type InitialState = {
  cameras: Camera[];
  camera: Camera | undefined;
  similarCameras: Camera[];
  pageCameras: Camera[];
  paginationPage: number;
  promoOffer: Promo | undefined;
}

const initialState: InitialState = {
  cameras: [],
  camera: undefined,
  similarCameras: [],
  pageCameras: [],
  paginationPage: 1,
  promoOffer: undefined,
};

export const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
      })
      .addCase(fetchCameraAction.fulfilled, (state, action) => {
        state.camera = action.payload;
      })
      .addCase(fetchPageCamerasAction.fulfilled, (state, action) => {
        state.pageCameras = action.payload;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promoOffer = action.payload;
      })
      .addCase(fetchSimilarAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
      });
  }
});
