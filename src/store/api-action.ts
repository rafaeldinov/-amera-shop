import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { Camera } from '../types/camera';
import { PageCameraData } from '../types/page-camera-data';
import { Promo } from '../types/promo';

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

export const fetchPageCamerasAction = createAsyncThunk<Camera[], PageCameraData, {
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
