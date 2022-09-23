import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { Camera } from '../types/camera';


export const fetchCamerasAction = createAsyncThunk<Camera[], undefined, {
  extra: AxiosInstance
}>(
  'fetchCameras',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Camera[]>(APIRoute.Cameras);
    return data;
  },
);
