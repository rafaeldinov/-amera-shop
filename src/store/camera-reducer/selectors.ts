import { Camera } from '../../types/camera';
import { Promo } from '../../types/promo';
import { State } from '../../types/state';

export const getCameras = (state: State): Camera[] => state['camera'].cameras;
export const getPaginationPage = (state: State): number => state['camera'].paginationPage;
export const getPageCameras = (state: State): Camera[] => state['camera'].pageCameras;
export const getPromoOffer = (state: State): Promo | undefined => state['camera'].promoOffer;
