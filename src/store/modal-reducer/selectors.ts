import { State } from '../../types/state';

export const getIsActiveReviewModal = (state: State): boolean => state['modal'].isActiveReviewModal;
export const getIsActiveSuccessReviewModal = (state: State): boolean => state['modal'].isActiveSuccessReviewModal;
export const getIsActiveAddItemModal = (state: State): boolean => state['modal'].isActiveAddItemModal;
export const getIsActiveSuccessAddItemModal = (state: State): boolean => state['modal'].isActiveSuccessAddItemModal;
export const getIsActiveSuccessOrderModal = (state: State): boolean => state['modal'].isActiveSuccessOrderModal;
export const getIsActiveRemoveItemModal = (state: State): boolean => state['modal'].isActiveRemoveItemModal;
