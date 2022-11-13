import { createSlice } from '@reduxjs/toolkit';
import { fetchPageCamerasAction, fetchCameraAction, fetchCamerasAction, fetchPromoAction, fetchSimilarAction, fetchReviewsAction, sendProductReviewAction, fetchFilteredCamerasAction } from '../api-action';
import { Camera } from '../../types/camera';
import { Promo } from '../../types/promo';
import { Review } from '../../types/review';
import { START_PAGE_COUNT } from '../../const';
import { Filters } from '../../types/filters';

type InitialState = {
  cameras: Camera[];
  filteredCameras: Camera[];
  allCamerasCount: number;
  camera: Camera | undefined;
  similarCameras: Camera[];
  pageCameras: Camera[];
  filteredCamerasLoading: boolean;
  reviews: Review[];
  currentPage: number;
  promoOffer: Promo | undefined;
  isActiveReviewModal: boolean;
  isActiveSuccessReviewModal: boolean;
  filters?: Filters;
  sorting?: {
    sortType: string;
    sortOrder: string;
  };
}

const initialState: InitialState = {
  cameras: [],
  filteredCameras: [],
  allCamerasCount: 0,
  camera: undefined,
  similarCameras: [],
  pageCameras: [],
  filteredCamerasLoading: false,
  reviews: [],
  currentPage: START_PAGE_COUNT,
  promoOffer: undefined,
  isActiveReviewModal: false,
  isActiveSuccessReviewModal: false,
  filters: {
    category: {
      photoCamera: false,
      videoCamera: false,
    },
    type: {
      digital: false,
      film: false,
      snapshot: false,
      collection: false,
    },
    level: {
      zero: false,
      amateur: false,
      professional: false,
    },
    minPrice: undefined,
    maxPrice: undefined,
  },
  sorting: {
    sortType: '',
    sortOrder: '',
  }
};

export const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setIsActiveReviewModal(state, action) {
      state.isActiveReviewModal = action.payload;
    },
    setIsActiveSuccessReviewModal(state, action) {
      state.isActiveSuccessReviewModal = action.payload;
    },
    setSorting(state, action) {
      state.sorting = action.payload;
    },
    setDefaultFilters(state, action) {
      state.filters = action.payload;
    },
    setAllCamerasCount(state, action) {
      state.allCamerasCount = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
      })
      .addCase(fetchFilteredCamerasAction.pending, (state) => {
        state.filteredCamerasLoading = true;
      })
      .addCase(fetchFilteredCamerasAction.fulfilled, (state, action) => {
        state.filteredCameras = action.payload;
        state.filteredCamerasLoading = false;
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
      })
      .addCase(sendProductReviewAction.fulfilled, (state, action) => {
        state.isActiveSuccessReviewModal = true;
        state.reviews.unshift(action.payload);
      });
  }
});

export const { setIsActiveReviewModal, setIsActiveSuccessReviewModal, setSorting, setDefaultFilters, setCurrentPage, setAllCamerasCount } = cameraSlice.actions;
