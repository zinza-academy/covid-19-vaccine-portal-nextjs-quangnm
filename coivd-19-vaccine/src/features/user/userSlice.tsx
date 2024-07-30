import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '../../requestMethod';

export interface UserInfo {
  email: string;
  password: string;
}

export interface UserState {
  value: any;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: true | false;
}

export const loginAsync = createAsyncThunk(
  'user/login',
  async (loginInfo: UserInfo): Promise<UserInfo> => {
    const res = await axiosInstance.post<UserInfo>('/auth/login', loginInfo);
    return res.data;
  }
);