import { Camera } from '../../types/camera';
import { State } from '../../types/state';

export const getCameras = (state: State): Camera[] => state['camera'].cameras;
export const getActivePaginationNumber = (state: State): number => state['camera'].activePaginationNumber;
export const getActivePageCameras = (state: State): Camera[] => state['camera'].activePageCameras;

