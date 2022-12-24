import { cameraSlice, setIsActiveReviewModal, setIsActiveSuccessReviewModal } from './camera-reducer';
import { fetchFilteredCamerasAction, fetchCameraAction, fetchPageCamerasAction, fetchReviewsAction, fetchPromoAction, fetchSimilarAction, } from '../api-action';
import { CAMERAS_COUNT, makeFakeCamera, makeFakeCameras, makeFakePromo, makeFakeReviews, REVIEWS_COUNT, SIMILARS_ITEMS_COUNT } from '../../mock';
import { DefaultFiters, ITEMS_PER_PAGE_COUNT, START_PAGE_COUNT } from '../../const';
import { getBasket } from '../../util';

describe('Reducer: cameraSlice', () => {
  const reducer = cameraSlice.reducer;

  const fakeCameras = makeFakeCameras(CAMERAS_COUNT);
  const fakeCamera = makeFakeCamera();
  const fakeSimilarCameras = makeFakeCameras(SIMILARS_ITEMS_COUNT);
  const fakePageCameras = makeFakeCameras(ITEMS_PER_PAGE_COUNT);
  const fakeReviews = makeFakeReviews(REVIEWS_COUNT);
  const fakePromoOffer = makeFakePromo();

  const initialState = {
    cameras: [],
    filteredCameras: [],
    allCamerasCount: 0,
    camera: undefined,
    similarCameras: [],
    pageCameras: [],
    filteredCamerasLoading: false,
    reviews: [],
    currentPage: START_PAGE_COUNT,
    promoOffer: undefined,
    isActiveReviewModal: false,
    isActiveSuccessReviewModal: false,
    isActiveAddItemModal: false,
    isActiveSuccessAddItemModal: false,
    isActiveRemoveItemModal: false,
    isActiveSuccessOrderModal: false,
    removableItem: undefined,
    itemToBuy: undefined,
    discount: undefined,
    basketItems: getBasket(),
    filters: DefaultFiters,
    sorting: {
      sortType: '',
      sortOrder: '',
    }
  };

  it('should be update cameras when fetch type fulfilled', () => {
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
  it('should be update camera when fetch type fulfilled', () => {
    const action = {
      type: fetchCameraAction.fulfilled.type,
      payload: fakeCamera,
    };
    const state = reducer(initialState, action);
    expect(state)
      .toEqual({
        ...initialState,
        camera: fakeCamera,
      });
  });
  it('should be update similarCameras when fetch type fulfilled', () => {
    const action = {
      type: fetchSimilarAction.fulfilled.type,
      payload: fakeSimilarCameras,
    };
    const state = reducer(initialState, action);
    expect(state)
      .toEqual({
        ...initialState,
        similarCameras: fakeSimilarCameras,
      });
  });
  it('should be update pageCameras when fetch type fulfilled', () => {
    const action = {
      type: fetchPageCamerasAction.fulfilled.type,
      payload: {
        data: fakePageCameras,
        camerasCount: CAMERAS_COUNT,
      }
    };
    const state = reducer(initialState, action);
    expect(state)
      .toEqual({
        ...initialState,
        pageCameras: fakePageCameras,
        allCamerasCount: CAMERAS_COUNT,
      });
  });
  it('should be update reviews when fetch type fulfilled', () => {
    const action = {
      type: fetchReviewsAction.fulfilled.type,
      payload: fakeReviews,
    };
    const state = reducer(initialState, action);
    expect(state)
      .toEqual({
        ...initialState,
        reviews: fakeReviews,
      });
  });
  it('should be update promoOffer when fetch type fulfilled', () => {
    const action = {
      type: fetchPromoAction.fulfilled.type,
      payload: fakePromoOffer,
    };
    const state = reducer(initialState, action);
    expect(state)
      .toEqual({
        ...initialState,
        promoOffer: fakePromoOffer,
      });
  });
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
  it('without additional parameters should return initial state', () => {
    expect(reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });
});
