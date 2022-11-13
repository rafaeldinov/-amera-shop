import { Camera } from '../../types/camera';
import { Promo } from '../../types/promo';
import { Review } from '../../types/review';
import { State } from '../../types/state';
import { createSelector } from 'reselect';
import { SortingMode } from '../../const';

export const getCameras = (state: State): Camera[] => state['camera'].cameras;
export const getCamera = (state: State): Camera | undefined => state['camera'].camera;
export const getSimilarCameras = (state: State): Camera[] => state['camera'].similarCameras;
export const getReviews = (state: State): Review[] => state['camera'].reviews;
export const getPaginationPage = (state: State): number => state['camera'].paginationPage;
export const getPromoOffer = (state: State): Promo | undefined => state['camera'].promoOffer;
export const getIsActiveReviewModal = (state: State): boolean => state['camera'].isActiveReviewModal;
export const getIsActiveSuccessReviewModal = (state: State): boolean => state['camera'].isActiveSuccessReviewModal;
export const getPageCameras = (state: State): Camera[] => state['camera'].pageCameras;
export const getSorting = (state: State): string => state['camera'].sorting;

export const getSortedReviews = createSelector(
  getReviews,
  (reviews) => reviews.slice()
    .sort((a: Review , b: Review) => new Date(b.createAt)
      .getTime() - new Date(a.createAt)
      .getTime())
);

export const getSortedCameras = createSelector(
  getPageCameras,
  getSorting,
  (cameras, sorting) => {
    switch(sorting) {
      case SortingMode.PriceAscending:
        return cameras.slice().sort((a: Camera, b: Camera) => a.price - b.price);
      case SortingMode.PriceDescending:
        return cameras.slice().sort((a: Camera, b: Camera) => b.price - a.price);
      case SortingMode.RatingAscending:
        return cameras.slice().sort((a: Camera, b: Camera) => a.rating - b.rating);
      case SortingMode.RatingDescending:
        return cameras.slice().sort((a: Camera, b: Camera) => b.rating - a.rating);
      default:
        return cameras;
    }
  }
);
