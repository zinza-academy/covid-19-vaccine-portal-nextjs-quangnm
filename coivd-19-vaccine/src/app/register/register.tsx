'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
    Grid,
    Button,
    Box,
    Typography,
    TextField,
    Paper,
    FormControl,
    InputLabel,
    FormHelperText,
    FormControlLabel,
    Radio,
    RadioGroup
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useForm, Controller } from 'react-hook-form';
import bgforget from '@/asset/image/bgforget.jpg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { registerAsync } from '../../features/user/registerSlice';
import { axiosInstance } from '../../requestMethod';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface Ward {
    id: number;
    name: string;
    district_id: number;
}

interface District {
    id: number;
    name: string;
    wards: Ward[];
    city_id: number;
}

interface City {
    id: number;
    name: string;
    district: District[];
}

interface FormData {
    cccd: string;
    email: string;
    password: string;
    name: string;
    dob: Date | string;
    gender: string;
    city_id: number | string;
    district_id: number | string;
    ward_id: number | string;
    role_id: number | string;
    reset_pass_token: string
}

const defaultValues = {
    cccd: '',
    email: '',
    password: '',
    name: '',
    dob: '',
    gender: '',
    city_id: 0,
    district_id: 0,
    ward_id: 0,
    role_id: 2,
    reset_pass_token: ''
};

const schema = yup
    .object({
        cccd: yup
        .string()
        .required('cccd là bắt buộc')
        .matches(/^\d+$/, 'cccd phải chỉ chứa các số') 
        .min(9, 'cccd phải có ít nhất 9 ký tự') 
        .max(12, 'cccd không được vượt quá 12 ký tự'), 
        email: yup.string().email().required(),
        password: yup
            .string()
            .required()
            .min(8)
            .matches(/^\S*$/, 'Mật khẩu không được có khoảng trắng'),
        name: yup.string().required(),
        gender: yup.string().required(),
        dob: yup.string().nullable().required('Date is required field'),
        city_id: yup.number().min(1, 'Thông tin không được để trống'),
        district_id: yup
            .number()
            .required()
            .min(1, 'Thông tin không được để trống'),
        ward_id: yup.number().required().min(1, 'Thông tin không được để trống')
    })
    .required();

const Register = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.register.status);
    const error = useAppSelector((state) => state.register.error);
    const [districts, setDistricts] = useState<District[]>([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosInstance.get('/location');
                setData(res.data);
            } catch (err) {
                console.log('lỗi');
            }
        };
        getData();
    }, []);

    const citys: City[] = data;

    const {
        control,
        handleSubmit,
        formState: { isValid },
        setValue,
        watch
    } = useForm<FormData>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const cityId = watch('city_id');
    const districtId = watch('district_id');

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (name === 'city_id') {
                setValue('district_id', '');
                setValue('ward_id', '');
            }
            if (name === 'district_id') {
                setValue('ward_id', '');
            }
        });
        return () => subscription.unsubscribe();
    }, [setValue, watch]);

    useEffect(() => {
        const foundCity = citys.find((city) => city.id === cityId);
        setDistricts(foundCity?.district ?? []);
    }, [cityId, citys]);

    const wards = useMemo(() => {
        return (
            districts.find((district) => district.id === districtId)?.wards ??
            []
        );
    }, [districtId, districts]);

    const onSubmit = (data: FormData) => {
        const { city_id, district_id, ...registerInfo } = data;
        dispatch(registerAsync(registerInfo));
      };

    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={6}
                md={6}
                sx={{
                    backgroundImage: `url(${bgforget.src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light'
                            ? t.palette.grey[50]
                            : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

            <Grid
                item
                xs={false}
                sm={6}
                md={6}
                component={Paper}
                elevation={6}
                square
                justifyContent="center"
                alignItems="center"
                sx={{ display: 'flex' }}>
                <Box
                    sx={{
                        mx: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        py: 10
                    }}>
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{ mb: 3 }}
                        fontWeight={'bold'}>
                        Đăng kí tài khoản
                    </Typography>

                    <Box
                        component="form"
                        noValidate
                        sx={{ mt: 1 }}
                        onSubmit={handleSubmit(onSubmit)}>
                        <Grid>
                            <Typography variant="body1" component="span">
                                Số CMND/CCCD
                                <Typography
                                    variant="body1"
                                    component="span"
                                    color="error">
                                    {' '}
                                    (*)
                                </Typography>
                            </Typography>
                            <Controller
                                name="cccd"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        placeholder="Số CMND/CCCD"
                                        sx={{
                                            width: '100%',
                                            mb: 2
                                        }}
                                        {...field}
                                        error={!!error}
                                        helperText={error?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid>
                            <Typography variant="body1" component="span">
                                Email
                            </Typography>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        placeholder="Email"
                                        sx={{
                                            width: '100%',
                                            mb: 2
                                        }}
                                        {...field}
                                        error={!!error}
                                        helperText={error?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid>
                            <Typography variant="body1" component="span">
                                Mật khẩu
                            </Typography>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        type="password"
                                        placeholder="Email"
                                        sx={{
                                            width: '100%',
                                            mb: 2
                                        }}
                                        {...field}
                                        error={!!error}
                                        helperText={error?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid>
                            <Typography variant="body1" component="span">
                                Họ và tên
                                <Typography
                                    variant="body1"
                                    component="span"
                                    color="error">
                                    {' '}
                                    (*)
                                </Typography>
                            </Typography>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        placeholder="Họ và rên"
                                        sx={{
                                            width: '100%',
                                            mb: 2
                                        }}
                                        {...field}
                                        error={!!error}
                                        helperText={error?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid>
                            <Typography variant="body1" component="span">
                                Ngày sinh
                                <Typography
                                    variant="body1"
                                    component="span"
                                    color="error">
                                    {' '}
                                    (*)
                                </Typography>
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    components={['DatePicker']}
                                    sx={{ mb: 2 }}>
                                    <Controller
                                        name="dob"
                                        control={control}
                                        rules={{
                                            required: 'Vui lòng chọn ngày sinh.'
                                        }}
                                        render={({ field }) => (
                                            <DatePicker
                                                {...field}
                                                value={field.value || dayjs()}
                                                onChange={(newValue) => {
                                                    setValue('dob', newValue);
                                                }}
                                                sx={{ width: '100%' }}
                                            />
                                        )}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>

                        <Grid>
                            <Typography variant="body1" component="span">
                                Giới tính
                                <Typography
                                    variant="body1"
                                    component="span"
                                    color="error">
                                    {' '}
                                    (*)
                                </Typography>
                            </Typography>
                            <Grid display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                <Controller
                                    name="gender"
                                    control={control}
                                    render={({
                                        field,
                                        fieldState: { error }
                                    }) => (
                                        <FormControl>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                {...field}
                                                onChange={(event: any) => {
                                                    field.onChange(
                                                        event.target.value
                                                    );
                                                }}>
                                                <FormControlLabel
                                                    value="nam"
                                                    control={<Radio />}
                                                    label="Nam"
                                                />
                                                <FormControlLabel
                                                    value="nữ"
                                                    control={<Radio />}
                                                    label="Nữ"
                                                />
                                            </RadioGroup>
                                            {error && (
                                                <FormHelperText
                                                    sx={{ color: 'red' }}>
                                                    {error?.message}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                        </Grid>

                        <Grid marginBottom={2}>
                            <Typography variant="body1" component="span">
                                Tỉnh/Thành phố
                                <Typography
                                    variant="body1"
                                    component="span"
                                    color="error">
                                    {' '}
                                    (*)
                                </Typography>
                            </Typography>
                            <Controller
                                name="city_id"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <FormControl
                                        fullWidth
                                        required
                                        sx={{ mt: 1 }}>
                                        <InputLabel id="input-label">
                                            Province
                                        </InputLabel>
                                        <Select
                                            defaultValue=""
                                            labelId="city-label-id"
                                            id="city-select"
                                            label="city"
                                            {...field}
                                            onChange={(event) => {
                                                field.onChange(
                                                    event.target.value
                                                );
                                            }}>
                                            {citys.map((city) => (
                                                <MenuItem
                                                    key={city.id}
                                                    value={city.id}>
                                                    {city.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {error && (
                                            <FormHelperText
                                                sx={{ color: 'red' }}>
                                                {error?.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />
                        </Grid>

                        <Grid marginBottom={2}>
                            <Typography variant="body1" component="span">
                                Quận huyện
                                <Typography
                                    variant="body1"
                                    component="span"
                                    color="error">
                                    {' '}
                                    (*)
                                </Typography>
                            </Typography>
                            <Controller
                                render={({ field, fieldState: { error } }) => (
                                    <FormControl
                                        fullWidth
                                        required
                                        sx={{ mt: 1 }}>
                                        <InputLabel id="input-label">
                                            District
                                        </InputLabel>
                                        <Select
                                            defaultValue=""
                                            labelId="district-label-id"
                                            id="district-select"
                                            label="district"
                                            {...field}
                                            fullWidth
                                            onChange={(event) => {
                                                field.onChange(
                                                    event.target.value
                                                );
                                            }}>
                                            {districts.map((district) => (
                                                <MenuItem
                                                    key={district.id}
                                                    value={district.id}>
                                                    {district.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {error && (
                                            <FormHelperText
                                                sx={{ color: 'red' }}>
                                                {error?.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                                name="district_id"
                                control={control}
                            />
                        </Grid>

                        <Grid marginBottom={2}>
                            <Typography variant="body1" component="span">
                                Xã Phường
                                <Typography
                                    variant="body1"
                                    component="span"
                                    color="error">
                                    {' '}
                                    (*)
                                </Typography>
                            </Typography>

                            <Controller
                                name="ward_id"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <FormControl
                                        fullWidth
                                        required
                                        sx={{ mt: 1 }}>
                                        <InputLabel id="input-label">
                                            Ward
                                        </InputLabel>
                                        <Select
                                            defaultValue=""
                                            labelId="ward-label-id"
                                            id="ward-select"
                                            label="ward"
                                            {...field}
                                            onChange={(event) => {
                                                field.onChange(
                                                    event.target.value
                                                );
                                            }}>
                                            {wards.map((ward) => (
                                                <MenuItem
                                                    key={ward.id}
                                                    value={ward.id}>
                                                    {ward.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {error && (
                                            <FormHelperText
                                                sx={{ color: 'red' }}>
                                                {error?.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />
                        </Grid>

                        {status === 'failed' && (
                            <Typography
                                sx={{
                                    color: 'red',
                                    textAlign: 'center',
                                    mb: 1
                                }}>
                                {error !== ''
                                    ? error
                                    : 'Đăng ký thất bại, hãy thử lại!!!'}
                            </Typography>
                        )}

                        <Grid container justifyContent={'flex-end'}>
                            <Button
                                variant="outlined"
                                color="success"
                                sx={{ mt: 2 }}
                                type="submit">
                                Tiếp tục <ArrowForwardIcon></ArrowForwardIcon>
                            </Button>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Register;
