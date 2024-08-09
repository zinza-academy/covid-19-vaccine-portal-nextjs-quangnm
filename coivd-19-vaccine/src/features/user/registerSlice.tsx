import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '../../requestMethod';

export interface RegisterInfo {
    cccd: string;
    email: string;
    password: string;
    name: string;
    dob: Date | string;
    gender: string;
    ward_id: number | string;
    role_id: number | string;
    reset_pass_token: string
}

export interface RegisterState {
    value: any;
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    loading: true | false;
    error: any;
}

const initialState: RegisterState = {
    value: {
        cccd: '',
        email: '',
        password: '',
        name: '',
        dob: '',
        gender: '',
        ward_id: 0,
        role_id: 0,
        reset_pass_token: ''
    },
    status: 'idle',
    loading: false,
    error: ''
};

export const registerAsync = createAsyncThunk(
    'register',
    async (
        registerInfo: RegisterInfo,
        { rejectWithValue }
    ): Promise<RegisterInfo | unknown> => {
        try {
            const res = await axiosInstance.post<RegisterInfo>(
                '/users',
                registerInfo
            );
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerAsync.pending, (state) => {
                state.status = 'pending';
                state.loading = true;
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.loading = false;
                state.value = action.payload;
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const {} = registerSlice.actions;
export default registerSlice.reducer;
