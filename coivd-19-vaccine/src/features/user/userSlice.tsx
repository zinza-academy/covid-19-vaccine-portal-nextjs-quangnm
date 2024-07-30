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
  token: string | null;
}

const initialState: UserState = {
  value: null,
  status: 'idle',
  loading: false,
  token: null
};

export const loginAsync = createAsyncThunk(
  'user/login',
  async (loginInfo: UserInfo): Promise<{ token: string; user: any }> => {
    const res = await axiosInstance.post<{ token: string; user: any }>('/auth/login', loginInfo);
    return res.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.value = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });
  }
});

export const {} = userSlice.actions;
export default userSlice.reducer;
