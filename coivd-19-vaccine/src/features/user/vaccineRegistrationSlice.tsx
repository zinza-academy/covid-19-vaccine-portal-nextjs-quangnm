import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstanceWithToken } from '../../requestMethod';

export interface VaccineRegistrationInfo {
  user_id: number;
  priority_group: string;
  health_insurance: string;
  career: string;
  work_place: string;
  address: string;
  expected_date: Date | string;
  session: string;
}

export interface VaccineRegistrationState {
  vaccineRegistrationInfo: VaccineRegistrationInfo;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: true | false;
}

const initialState: VaccineRegistrationState = {
  vaccineRegistrationInfo: {
    user_id: 2,
    priority_group: '',
    health_insurance: '',
    career: '',
    work_place: '',
    address: '',
    expected_date: '',
    session: ''
  },
  status: 'idle',
  loading: false
};

export const vaccineRegistrationAsync = createAsyncThunk(
  'user/vaccine-registration',
  async (data: VaccineRegistrationInfo) => {
    const res = await axiosInstanceWithToken.post<VaccineRegistrationInfo>(
      'registration',
      data
    );
    return res.data;
  }
);
export const vaccineRegistrationSlice = createSlice({
  name: 'vaccineRegistration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(vaccineRegistrationAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(vaccineRegistrationAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.vaccineRegistrationInfo = action.payload;
      })
      .addCase(vaccineRegistrationAsync.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });
  }
});

export const {} = vaccineRegistrationSlice.actions;
export default vaccineRegistrationSlice.reducer;