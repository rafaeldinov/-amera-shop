import { createSlice } from '@reduxjs/toolkit';
import { sendCouponAction } from '../api-action';
import { Camera } from '../../types/camera';
import { getBasket } from '../../util';
import { CartItem } from '../../types/cart-item';

type InitialState = {
  removableItem?: CartItem;
  itemToBuy?: Camera;
  discount?: string;
  basketItems?: CartItem[];
}

const initialState: InitialState = {
  removableItem: undefined,
  itemToBuy: undefined,
  discount: undefined,
  basketItems: getBasket(),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItemToBuy(state, action) {
      state.itemToBuy = action.payload;
    },
    setRemovableItem(state, action) {
      state.removableItem = action.payload;
    },
    setBasketItems(state, action) {
      state.basketItems = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendCouponAction.fulfilled, (state, action) => {
        state.discount = action.payload;
      });
  }
});

export const { setItemToBuy, setRemovableItem, setBasketItems } = cartSlice.actions;
