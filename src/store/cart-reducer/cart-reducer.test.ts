import { cartSlice } from './cart-reducer';
import { getBasket } from '../../util';
import { sendCouponAction } from '../api-action';
import { FAKE_DISCOUNT_VALUE } from '../../mock';

describe('Reducer: cartSlice', () => {
  const reducer = cartSlice.reducer;

  const initialState = {
    removableItem: undefined,
    itemToBuy: undefined,
    discount: undefined,
    basketItems: getBasket(),
  };

  it('should be update discount when fetch type fulfilled', () => {
    const action = {
      type: sendCouponAction.fulfilled.type,
      payload: FAKE_DISCOUNT_VALUE,
    };
    const state = reducer(initialState, action);
    expect(state)
      .toEqual({
        ...initialState,
        discount: FAKE_DISCOUNT_VALUE,
      });
  });

  it('without additional parameters should return initial state', () => {
    expect(reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });
});
