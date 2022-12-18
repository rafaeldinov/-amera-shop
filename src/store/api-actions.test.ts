import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { fetchCameraAction, fetchPageCamerasAction, fetchReviewsAction, sendProductReviewAction, fetchPromoAction, fetchSimilarAction } from './api-action';
import { APIRoute, DefaultFiters, ITEMS_PER_PAGE_COUNT } from '../const';
import { State } from '../types/state';
import { CAMERAS_COUNT, makeFakeCamera, makeFakeCameras, makeFakeReviews, makeFakeSendReview, REVIEWS_COUNT } from '../mock';

const fakeCameras = makeFakeCameras(CAMERAS_COUNT);
const fakeCamera = makeFakeCamera();
const fakeCamerasPerPage = makeFakeCameras(CAMERAS_COUNT).slice(ITEMS_PER_PAGE_COUNT);
const fakeReview = makeFakeSendReview();
const fakeReviews = makeFakeReviews(REVIEWS_COUNT);

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should load camera when GET /cameras/{id}', async () => {
    const id = fakeCameras[0].id.toString();
    mockAPI
      .onGet(`${APIRoute.Cameras}/${id}`)
      .reply(200, fakeCamera);

    const store = mockStore();
    await store.dispatch(fetchCameraAction(id));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toContain(fetchCameraAction.pending.type);
    expect(actions).toContain(fetchCameraAction.fulfilled.type);
    expect(actions).not.toContain(fetchCameraAction.rejected.type);
  });
  it('should load filtered cameras per page when GET /cameras/?_start={start}&_end={end}', async () => {
    const start = 1;
    const end = ITEMS_PER_PAGE_COUNT;

    mockAPI
      .onGet(`${APIRoute.Cameras}?&_&_start=${start}&_end=${end}`)
      .reply(200, {
        pageCameras: fakeCamerasPerPage
      },
      {
        'x-total-count': CAMERAS_COUNT,
      }
      );

    const store = mockStore({
      camera: {
        filters: DefaultFiters,
        sorting: {
          sortType: '',
          sortOrder: '',
        }
      }
    });
    await store.dispatch(fetchPageCamerasAction({start, end}));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toContain(fetchPageCamerasAction.pending.type);
    expect(actions).toContain(fetchPageCamerasAction.fulfilled.type);
    expect(actions).not.toContain(fetchPageCamerasAction.rejected.type);
  });
  it('should load promoOffer when GET /promo', async () => {
    mockAPI
      .onGet(APIRoute.PromoOffer)
      .reply(200, fakeCamera);

    const store = mockStore();
    await store.dispatch(fetchPromoAction());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toContain(fetchPromoAction.pending.type);
    expect(actions).toContain(fetchPromoAction.fulfilled.type);
    expect(actions).not.toContain(fetchPromoAction.rejected.type);
  });
  it('should load similar items when GET /cameras/{id}/similar', async () => {
    const id = fakeCameras[0].id.toString();

    mockAPI
      .onGet(`${APIRoute.Cameras}/${id}/similar`)
      .reply(200, fakeCamera);

    const store = mockStore();
    await store.dispatch(fetchSimilarAction(id));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toContain(fetchSimilarAction.pending.type);
    expect(actions).toContain(fetchSimilarAction.fulfilled.type);
    expect(actions).not.toContain(fetchSimilarAction.rejected.type);
  });
  it('should load similar items when GET /cameras/{id}/reviews', async () => {
    const id = fakeCameras[0].id.toString();

    mockAPI
      .onGet(`${APIRoute.Cameras}/${id}/reviews`)
      .reply(200, fakeCamera);

    const store = mockStore();
    await store.dispatch(fetchReviewsAction(id));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toContain(fetchReviewsAction.pending.type);
    expect(actions).toContain(fetchReviewsAction.fulfilled.type);
    expect(actions).not.toContain(fetchReviewsAction.rejected.type);
  });

  it('should send  new review when POST /reviews', async () => {
    mockAPI
      .onPost(APIRoute.ReviewPost)
      .reply(200, fakeReviews);
    const store = mockStore();
    await store.dispatch(sendProductReviewAction(fakeReview));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toContain(sendProductReviewAction.fulfilled.type);
    expect(actions).not.toContain(sendProductReviewAction.rejected.type);
  });
});
