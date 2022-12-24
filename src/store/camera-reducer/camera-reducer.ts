import { createSlice } from '@reduxjs/toolkit';
import { fetchPageCamerasAction, fetchCameraAction, fetchCamerasAction, fetchPromoAction, fetchSimilarAction, fetchReviewsAction, sendProductReviewAction, fetchFilteredCamerasAction, sendCouponAction } from '../api-action';
import { Camera } from '../../types/camera';
import { Promo } from '../../types/promo';
import { Review } from '../../types/review';
import { DefaultFiters, START_PAGE_COUNT } from '../../const';
import { Filters } from '../../types/filters';
import { getBasket } from '../../util';
import { CartItem } from '../../types/cart-item';

type InitialState = {
  cameras: Camera[];
  filteredCameras: Camera[];
  allCamerasCount: number;
  camera?: Camera;
  similarCameras: Camera[];
  pageCameras: Camera[];
  filteredCamerasLoading: boolean;
  reviews: Review[];
  currentPage: number;
  promoOffer?: Promo;
  isActiveReviewModal: boolean;
  isActiveSuccessReviewModal: boolean;
  isActiveAddItemModal: boolean;
  isActiveSuccessAddItemModal: boolean;
  isActiveRemoveItemModal: boolean;
  isActiveSuccessOrderModal: boolean;
  removableItem?: CartItem;
  itemToBuy?: Camera;
  discount?: string;
  basketItems?: CartItem[];
  filters: Filters;
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
  isActiveAddItemModal: false,
  isActiveSuccessAddItemModal: false,
  isActiveRemoveItemModal: false,
  isActiveSuccessOrderModal: false,
  removableItem: undefined,
  itemToBuy: undefined,
  discount: undefined,
  basketItems: getBasket(),
  filters: DefaultFiters,
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
    showAddItemModal(state, action) {
      state.isActiveAddItemModal = action.payload;
    },
    setIsActiveSuccessAddItemModal(state, action) {
      state.isActiveSuccessAddItemModal = action.payload;
    },
    setIsActiveRemoveItemModal(state, action) {
      state.isActiveRemoveItemModal = action.payload;
    },
    setIsActiveSuccessOrderModal(state, action) {
      state.isActiveSuccessOrderModal = action.payload;
    },
    setSorting(state, action) {
      state.sorting = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
    setItemToBuy(state, action) {
      state.itemToBuy = action.payload;
    },
    setRemovableItem(state, action) {
      state.removableItem = action.payload;
    },
    setBasketItems(state, action) {
      state.basketItems = action.payload;
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
      .addCase(sendCouponAction.fulfilled, (state, action) => {
        state.discount = action.payload;
      })
      .addCase(sendProductReviewAction.fulfilled, (state, action) => {
        state.isActiveSuccessReviewModal = true;
        state.reviews.unshift(action.payload);
      });
  }
});

export const { setIsActiveReviewModal, setItemToBuy, setRemovableItem, setBasketItems, setIsActiveSuccessOrderModal, setIsActiveRemoveItemModal, setIsActiveSuccessReviewModal, setSorting, setFilters, setCurrentPage, showAddItemModal, setIsActiveSuccessAddItemModal, setAllCamerasCount } = cameraSlice.actions;
