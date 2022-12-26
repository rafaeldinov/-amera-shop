import { createSlice } from '@reduxjs/toolkit';
import { sendOrderAction } from '../api-action';

type InitialState = {
  isActiveReviewModal: boolean;
  isActiveSuccessReviewModal: boolean;
  isActiveAddItemModal: boolean;
  isActiveSuccessAddItemModal: boolean;
  isActiveRemoveItemModal: boolean;
  isActiveSuccessOrderModal: boolean;
}

const initialState: InitialState = {
  isActiveReviewModal: false,
  isActiveSuccessReviewModal: false,
  isActiveAddItemModal: false,
  isActiveSuccessAddItemModal: false,
  isActiveRemoveItemModal: false,
  isActiveSuccessOrderModal: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
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
  },
  extraReducers(builder) {
    builder
      .addCase(sendOrderAction.fulfilled, (state) => {
        state.isActiveSuccessOrderModal = true;
      });
  }
});

export const { setIsActiveReviewModal, setIsActiveSuccessOrderModal, setIsActiveRemoveItemModal, setIsActiveSuccessReviewModal, showAddItemModal, setIsActiveSuccessAddItemModal } = modalSlice.actions;
