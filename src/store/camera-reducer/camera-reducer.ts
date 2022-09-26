import { createSlice } from '@reduxjs/toolkit';
import { fetchCamerasAction, fetchPageCamerasAction, fetchPromoAction } from '../api-action';
import { Camera } from '../../types/camera';
import { Promo } from '../../types/promo';

type InitialState = {
  cameras: Camera[];
  pageCameras: Camera[];
  paginationPage: number;
  promoOffer: Promo | undefined;
}

const initialState: InitialState = {
  cameras: [],
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
      .addCase(fetchPageCamerasAction.fulfilled, (state, action) => {
        state.pageCameras = action.payload;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promoOffer = action.payload;
      });
  }
});
