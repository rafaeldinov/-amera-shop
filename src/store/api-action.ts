import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { APIRoute, AppRoute } from '../const';
import { Camera } from '../types/camera';
import { CameraData } from '../types/camera-data';
import { Promo } from '../types/promo';
import { Review } from '../types/review';
import { ReviewPost } from '../types/review-post';
import { redirectToRoute } from './action';
import { getFilters, getSorting } from './camera-reducer/selectors';
import { getQueryFilters, getQuerySort } from '../util';
import { OrderPost } from '../types/order-post.js';
// import { setIsActiveSuccessOrderModal } from './camera-reducer/camera-reducer';

export const fetchCamerasAction = createAsyncThunk<Camera[], undefined, {
  state: State,
  extra: AxiosInstance
}>(
  'camera/fetchCameras',
  async (_arg, {getState, extra: api}) => {
    const state = getState();
    const sort = getSorting(state);
    const filters = getFilters(state);

    const {data} = await api.get<Camera[]>(`${APIRoute.Cameras}?${getQueryFilters({
      ...filters,
      minPrice: undefined,
      maxPrice: undefined,
    })}&_${getQuerySort(sort)}`);
    return data;
  },
);

export const fetchFilteredCamerasAction = createAsyncThunk<Camera[], undefined, {
  state: State,
  extra: AxiosInstance
}>(
  'camera/fetchFilteredCamerasAction',
  async (_arg, {getState, extra: api}) => {
    const state = getState();
    const sort = getSorting(state);
    const filters = getFilters(state);

    const {data} = await api.get<Camera[]>(`${APIRoute.Cameras}?${getQueryFilters(filters)}&_${getQuerySort(sort)}`);
    return data;
  },
);

export const fetchPageCamerasAction = createAsyncThunk<{data: Camera[], camerasCount: number}, CameraData, {
  state: State,
  extra: AxiosInstance
}>(
  'camera/fetchPageCameras',
  async ({start, end}, {getState, extra: api}) => {
    const state = getState();
    const sort = getSorting(state);
    const filters = getFilters(state);

    const {data, headers} = await api.get<Camera[]>(`${APIRoute.Cameras}?${getQueryFilters(filters)}&_${getQuerySort(sort)}&_start=${start}&_end=${end}`);
    const camerasCount = headers['x-total-count'];
    return {data, camerasCount};
  },
);

export const fetchCameraAction = createAsyncThunk<Camera | undefined, string, {
  dispatch: AppDispatch,
  extra: AxiosInstance
}>(
  'camera/fetchCamera',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Camera>(`${APIRoute.Cameras}/${id}`);
      return data;
    }catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  },
);

export const fetchPromoAction = createAsyncThunk<Promo, undefined, {
  extra: AxiosInstance
}>(
  'camera/fetchPromo',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Promo>(APIRoute.PromoOffer);
    return data;
  },
);

export const fetchSimilarAction = createAsyncThunk<Camera[], string, {
  extra: AxiosInstance
}>(
  'camera/fetchSimilar',
  async (id, {extra: api}) => {
    const {data} = await api.get<Camera[]>(`${APIRoute.Cameras}/${id}/similar`);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<Review[], string, {
  extra: AxiosInstance
}>(
  'camera/fetchReviews',
  async (id, {extra: api}) => {
    const {data} = await api.get<Review[]>(`${APIRoute.Cameras}/${id}/reviews`);
    return data;
  },
);

export const sendProductReviewAction = createAsyncThunk<Review, ReviewPost, {
  extra: AxiosInstance
}>(
  'camera/sendProductReview',
  async ({cameraId, userName, advantage, disadvantage, review, rating}, {extra: api}) => {
    const {data} = await api.post<Review>(APIRoute.ReviewPost, {cameraId, userName, advantage, disadvantage, review, rating});
    return data;
  },
);

export const sendOrderAction = createAsyncThunk<void, OrderPost, {
  dispatch: AppDispatch,
  extra: AxiosInstance
}>(
  'camera/sendOrderAction',
  async ({camerasIds, coupon}, {dispatch, extra: api}) => {
    try {
      await api.post(APIRoute.Orders, {camerasIds, coupon});
      // dispatch(setIsActiveSuccessOrderModal(true));
    }catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  },
);

export const sendCouponAction = createAsyncThunk<undefined, string, {
  extra: AxiosInstance
}>(
  'camera/sendCouponAction',
  async (coupon, {extra: api}) => {
    const {data} = await api.post(APIRoute.Coupons, {coupon});
    return data;
  },
);
