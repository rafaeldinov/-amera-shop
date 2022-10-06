import { Camera } from '../../types/camera';
import { Promo } from '../../types/promo';
import { Review } from '../../types/review';
import { State } from '../../types/state';
import { createSelector } from 'reselect';

export const getCameras = (state: State): Camera[] => state['camera'].cameras;
export const getCamera = (state: State): Camera | undefined => state['camera'].camera;
export const getSimilarCameras = (state: State): Camera[] => state['camera'].similarCameras;
export const getReviews = (state: State): Review[] => state['camera'].reviews;
export const getPaginationPage = (state: State): number => state['camera'].paginationPage;
export const getPageCameras = (state: State): Camera[] => state['camera'].pageCameras;
export const getPromoOffer = (state: State): Promo | undefined => state['camera'].promoOffer;
export const getIsActiveReviewModal = (state: State): boolean => state['camera'].isActiveReviewModal;
export const getIsActiveSuccessReviewModal = (state: State): boolean => state['camera'].isActiveSuccessReviewModal;

export const getSortedReviews = createSelector(
  getReviews,
  (reviews) => reviews.slice()
    .sort((a: Review , b: Review) => new Date(b.createAt)
      .getTime() - new Date(a.createAt)
      .getTime())
);
