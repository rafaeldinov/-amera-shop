import { modalSlice, setIsActiveRemoveItemModal, setIsActiveReviewModal, setIsActiveSuccessOrderModal, setIsActiveSuccessReviewModal, showAddItemModal } from './modal-reducer';

describe('Reducer: modalSlice', () => {
  const reducer = modalSlice.reducer;

  const initialState = {
    isActiveReviewModal: false,
    isActiveSuccessReviewModal: false,
    isActiveAddItemModal: false,
    isActiveSuccessAddItemModal: false,
    isActiveRemoveItemModal: false,
    isActiveSuccessOrderModal: false,
  };

  it('should update setIsActiveReviewModal with boolean flag', () => {
    expect(reducer(initialState, setIsActiveReviewModal(true)))
      .toEqual({
        ...initialState,
        isActiveReviewModal: true,
      });
  });
  it('should update setIsActiveSuccessReviewModal with boolean flag', () => {
    expect(reducer(initialState, setIsActiveSuccessReviewModal(true)))
      .toEqual({
        ...initialState,
        isActiveSuccessReviewModal: true,
      });
  });
  it('should update setIsActiveAddItemModal with boolean flag', () => {
    expect(reducer(initialState, showAddItemModal(true)))
      .toEqual({
        ...initialState,
        isActiveAddItemModal: true,
      });
  });
  it('should update setIsActiveRemoveItemModal with boolean flag', () => {
    expect(reducer(initialState, setIsActiveRemoveItemModal(true)))
      .toEqual({
        ...initialState,
        isActiveRemoveItemModal: true,
      });
  });
  it('should update setIsActiveSuccessOrderModal with boolean flag', () => {
    expect(reducer(initialState, setIsActiveSuccessOrderModal(true)))
      .toEqual({
        ...initialState,
        isActiveSuccessOrderModal: true,
      });
  });
  it('without additional parameters should return initial state', () => {
    expect(reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });
});
