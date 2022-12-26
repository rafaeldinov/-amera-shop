import { Sort } from '../../types/sort';
import { Filters } from '../../types/filters';
import { State } from '../../types/state';
import { Camera } from '../../types/camera';

export const getIsFilteredCamerasLoading = (state: State): boolean => state['filtersSorting'].filteredCamerasLoading;
export const getSorting = (state: State): Sort | undefined => state['filtersSorting'].sorting;
export const getFilters = (state: State): Filters => state['filtersSorting'].filters;
export const getFilteredCameras = (state: State): Camera[] => state['filtersSorting'].filteredCameras;
