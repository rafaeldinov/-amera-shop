import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { Camera } from '../types/camera';
import { CameraData } from '../types/camera-data';
import { Promo } from '../types/promo';
import { Review } from '../types/review';
import { ReviewPost } from '../types/review-post';

export const fetchCamerasAction = createAsyncThunk<Camera[], undefined, {
  extra: AxiosInstance
}>(
  'fetchCameras',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Camera[]>(APIRoute.Cameras);
    return data;
  },
);

export const fetchCameraAction = createAsyncThunk<Camera, string, {
  extra: AxiosInstance
}>(
  'fetchCamera',
  async (id, {extra: api}) => {
    const {data} = await api.get<Camera>(`${APIRoute.Cameras}/${id}`);
    return data;
  },
);

export const fetchPageCamerasAction = createAsyncThunk<Camera[], CameraData, {
  extra: AxiosInstance
}>(
  'fetchPageCameras',
  async ({start, end}, {dispatch, extra: api}) => {
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

export const sendProductReviewAction = createAsyncThunk<void, ReviewPost, {
  extra: AxiosInstance
}>(
  'sendProductReview',
  async ({cameraId, userName, advantage, disadvantage, review, rating}, {extra: api}) => {
    await api.post(APIRoute.ReviewPost, {cameraId, userName, advantage, disadvantage, review, rating});
  },
);
