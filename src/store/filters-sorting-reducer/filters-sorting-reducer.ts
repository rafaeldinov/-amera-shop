import { createSlice } from '@reduxjs/toolkit';
import { fetchFilteredCamerasAction } from '../api-action';
import { Camera } from '../../types/camera';
import { DefaultFiters } from '../../const';
import { Filters } from '../../types/filters';

type InitialState = {
  filteredCameras: Camera[];
  filteredCamerasLoading: boolean;
  filters: Filters;
  sorting?: {
    sortType: string;
    sortOrder: string;
  };
}

const initialState: InitialState = {
  filteredCameras: [],
  filteredCamerasLoading: false,
  filters: DefaultFiters,
  sorting: {
    sortType: '',
    sortOrder: '',
  }
};

export const filtersSortingSlice = createSlice({
  name: 'filtersSorting',
  initialState,
  reducers: {
    setSorting(state, action) {
      state.sorting = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilteredCamerasAction.pending, (state) => {
        state.filteredCamerasLoading = true;
      })
      .addCase(fetchFilteredCamerasAction.fulfilled, (state, action) => {
        state.filteredCameras = action.payload;
        state.filteredCamerasLoading = false;
      });
  }
});

export const { setSorting, setFilters } = filtersSortingSlice.actions;
