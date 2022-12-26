import { combineReducers } from '@reduxjs/toolkit';
import { cameraSlice } from './camera-reducer/camera-reducer';
import { cartSlice } from './cart-reducer/cart-reducer';
import { filtersSortingSlice } from './filters-sorting-reducer/filters-sorting-reducer';
import { modalSlice } from './modal-reducer/modal-reducer';


export const rootReducer = combineReducers({
  camera: cameraSlice.reducer,
  filtersSorting: filtersSortingSlice.reducer,
  cart: cartSlice.reducer,
  modal: modalSlice.reducer,
});
