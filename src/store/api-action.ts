import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AppRoute } from '../const';
import { Camera } from '../types/camera';
import { CameraData } from '../types/camera-data';
import { Promo } from '../types/promo';
import { Review } from '../types/review';
import { ReviewPost } from '../types/review-post';
import { redirectToRoute } from './action';

export const fetchCamerasAction = createAsyncThunk<Camera[], undefined, {
  extra: AxiosInstance
}>(
  'fetchCameras',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Camera[]>(APIRoute.Cameras);
    return data;
  },
);

export const fetchCameraAction = createAsyncThunk<Camera | undefined, string, {
  extra: AxiosInstance
}>(
  'fetchCamera',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Camera>(`${APIRoute.Cameras}/${id}`);
      return data;
    }catch {
      dispatch(redirectToRoute(AppRoute.Root));
    }
  },
);

export const fetchPageCamerasAction = createAsyncThunk<Camera[], CameraData, {
  extra: AxiosInstance
}>(
  'fetchPageCameras',
  async ({start, end}, {extra: api}) => {
    const {data} = await api.get<Camera[]>(`${APIRoute.Cameras}?_start=${start}&_end=${end}`);
    return data;
  },
);

export const fetchPromoAction = createAsyncThunk<Promo, undefined, {
  extra: AxiosInstance
}>(
  'fetchPromo',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Promo>(APIRoute.PromoOffer);
    return data;
  },
);

export const fetchSimilarAction = createAsyncThunk<Camera[], string, {
  extra: AxiosInstance
}>(
  'fetchSimilar',
  async (id, {extra: api}) => {
    const {data} = await api.get<Camera[]>(`${APIRoute.Cameras}/${id}/similar`);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<Review[], string, {
  extra: AxiosInstance
}>(
  'fetchReviews',
  async (id, {extra: api}) => {
    const {data} = await api.get<Review[]>(`${APIRoute.Cameras}/${id}/reviews`);
    return data;
  },
);

export const sendProductReviewAction = createAsyncThunk<Review, ReviewPost, {
  extra: AxiosInstance
}>(
  'sendProductReview',
  async ({cameraId, userName, advantage, disadvantage, review, rating}, {extra: api}) => {
    const {data} = await api.post<Review>(APIRoute.ReviewPost, {cameraId, userName, advantage, disadvantage, review, rating});
    return data;
  },
);
