import { createSlice } from '@reduxjs/toolkit';
import { fetchPageCamerasAction, fetchCameraAction, fetchCamerasAction, fetchPromoAction, fetchSimilarAction, fetchReviewsAction } from '../api-action';
import { Camera } from '../../types/camera';
import { Promo } from '../../types/promo';
import { Review } from '../../types/review';
import { START_PAGE_COUNT } from '../../const';

type InitialState = {
  cameras: Camera[];
  allCamerasCount: number;
  camera?: Camera;
  similarCameras: Camera[];
  pageCameras: Camera[];
  reviews: Review[];
  currentPage: number;
  promoOffer?: Promo;
}

const initialState: InitialState = {
  cameras: [],
  allCamerasCount: 0,
  camera: undefined,
  similarCameras: [],
  pageCameras: [],
  reviews: [],
  currentPage: START_PAGE_COUNT,
  promoOffer: undefined,
};

export const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
      })
      .addCase(fetchCameraAction.fulfilled, (state, action) => {
        state.camera = action.payload;
      })
      .addCase(fetchPageCamerasAction.fulfilled, (state, action) => {
        const {data, camerasCount} = action.payload;
        state.pageCameras = data;
        state.allCamerasCount = camerasCount;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promoOffer = action.payload;
      })
      .addCase(fetchSimilarAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  }
});

export const { setCurrentPage } = cameraSlice.actions;
