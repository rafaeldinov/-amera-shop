import { fetchFilteredCamerasAction, } from '../api-action';
import { CAMERAS_COUNT, makeFakeCameras } from '../../mock';
import { DefaultFiters } from '../../const';
import { filtersSortingSlice } from './filters-sorting-reducer';

describe('Reducer: filtersSortingSlice', () => {
  const reducer = filtersSortingSlice.reducer;

  const fakeCameras = makeFakeCameras(CAMERAS_COUNT);

  const initialState = {
    filteredCameras: [],
    filters: DefaultFiters,
    filteredCamerasLoading: false,
    sorting: {
      sortType: '',
      sortOrder: '',
    }
  };

  it('should be update filteredCameras when fetch type fulfilled', () => {
    const action = {
      type: fetchFilteredCamerasAction.fulfilled.type,
      payload: fakeCameras,
    };
    const state = reducer(initialState, action);
    expect(state)
      .toEqual({
        ...initialState,
        filteredCameras: fakeCameras,
      });
  });

  it('without additional parameters should return initial state', () => {
    expect(reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });
});
