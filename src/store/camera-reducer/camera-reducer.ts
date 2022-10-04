import { createSlice } from '@reduxjs/toolkit';
import { fetchCamerasAction, fetchPageCamerasAction, fetchCameraAction, fetchPromoAction, fetchSimilarAction, fetchReviewsAction, sendProductReviewAction } from '../api-action';
import { Camera } from '../../types/camera';
import { Promo } from '../../types/promo';
import { Review } from '../../types/review';

type InitialState = {
  cameras: Camera[];
  camera: Camera | undefined;
  similarCameras: Camera[];
  pageCameras: Camera[];
  reviews: Review[];
  paginationPage: number;
  promoOffer: Promo | undefined;
  isActiveReviewModal: boolean;
  isActiveSuccessReviewModal: boolean;
}

const initialState: InitialState = {
  cameras: [],
  camera: undefined,
  similarCameras: [],
  pageCameras: [],
  reviews: [],
  paginationPage: 1,
  promoOffer: undefined,
  isActiveReviewModal: false,
  isActiveSuccessReviewModal: false
};

export const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    setIsActiveReviewModal(state, action) {
      state.isActiveReviewModal = action.payload;
    },
    setIsActiveSuccessReviewModal(state, action) {
      state.isActiveSuccessReviewModal = action.payload;
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
        state.pageCameras = action.payload;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promoOffer = action.payload;
      })
      .addCase(fetchSimilarAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(sendProductReviewAction.fulfilled, (state, action) => {
        state.isActiveSuccessReviewModal = true;
        state.reviews.unshift(action.payload);
      });
  }
});

export const { setIsActiveReviewModal, setIsActiveSuccessReviewModal } = cameraSlice.actions;
