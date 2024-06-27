'use client'

import React, { useState } from 'react';
import { Grid, Button, Box, Typography, TextField, Paper } from '@mui/material';
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

const Register = () => {
    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            cmnd: '',
            email: '',
            password: '',
            name: '',
            birthDate: dayjs(), // Sử dụng ngày hiện tại hoặc một giá trị Dayjs mặc định
            gender: '',
            address: '',
            districts: '',
            wards: ''
        }
    });

    const [address, setAddress] = useState('');
    const [districts, setDistricts] = useState('');

    const addressData = [
        { id: 1, name: 'Hà Nội' },
        { id: 2, name: 'TP Hồ Chí Minh' },
        { id: 3, name: 'Đà Nẵng' },
    ];

    const dataDistricts = [
        { id: 101, cityId: 1, name: 'Ba Đình' },
        { id: 102, cityId: 1, name: 'Hoàn Kiếm' },
        { id: 103, cityId: 1, name: 'Hai Bà Trưng' },
        { id: 104, cityId: 2, name: 'Quận 1' },
        { id: 105, cityId: 2, name: 'Quận 2' },
        { id: 106, cityId: 2, name: 'Quận 3' },
        { id: 107, cityId: 3, name: 'Hải Châu' },
        { id: 108, cityId: 3, name: 'Thanh Khê' },
        { id: 109, cityId: 3, name: 'Sơn Trà' },
    ];

    const dataWards = [
        { id: 1001, districtId: 101, name: 'Phúc Xá' },
        { id: 1002, districtId: 101, name: 'Ngọc Hà' },
        { id: 1003, districtId: 102, name: 'Phan Chu Trinh' },
        { id: 1004, districtId: 102, name: 'Cửa Đông' },
        { id: 1005, districtId: 103, name: 'Bách Khoa' },
        { id: 1006, districtId: 103, name: 'Lê Đại Hành' },
        { id: 1007, districtId: 104, name: 'Bến Nghé' },
        { id: 1008, districtId: 104, name: 'Bến Thành' },
        { id: 1009, districtId: 105, name: 'Thảo Điền' },
        { id: 1010, districtId: 105, name: 'An Phú' },
        { id: 1011, districtId: 106, name: 'Cầu Ông Lãnh' },
        { id: 1012, districtId: 106, name: 'Nguyễn Thái Bình' },
        { id: 1013, districtId: 107, name: 'Hải Châu 1' },
        { id: 1014, districtId: 107, name: 'Hải Châu 2' },
        { id: 1015, districtId: 108, name: 'An Khê' },
        { id: 1016, districtId: 108, name: 'Chính Gián' },
        { id: 1017, districtId: 109, name: 'Mỹ An' },
        { id: 1018, districtId: 109, name: 'Phước Mỹ' },
    ];

    const filteredDistricts = dataDistricts.filter((item) => item.cityId.toString() == address);
    const filteredWards = dataWards.filter((item) => item.districtId.toString() == districts);

    const onSubmit = (data: any) => {
        console.log('Form Data:', data);
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
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
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
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{ mb: 3 }} fontWeight={'bold'}>
                        Đăng kí tài khoản
                    </Typography>

                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
                        <Grid>
                            <Typography variant="body1" component="span">
                                Số CMND/CCCD
                                <Typography variant="body1" component="span" color="error">
                                    {' '}(*)
                                </Typography>
                            </Typography>
                            <Controller
                                name="cmnd"
                                control={control}
                                rules={{
                                    required: 'Vui lòng nhập số CMND/CCCD.',
                                    pattern: {
                                        value: /^\d{9}$|^\d{12}$/,
                                        message: 'Số CMND/CCCD không hợp lệ. Vui lòng nhập lại.',
                                    },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        placeholder='Số CMND/CCCD'
                                        error={!!errors.cmnd}
                                        helperText={errors.cmnd?.message}
                                        sx={{ mb: 2 }}
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
                                rules={{
                                    required: 'Vui lòng nhập email.',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Email không hợp lệ.',
                                    },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        type='email'
                                        placeholder='user@gmail.com'
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        sx={{ mb: 2 }}
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
                                rules={{
                                    required: 'Vui lòng nhập mật khẩu.',
                                    minLength: {
                                        value: 8,
                                        message: 'Mật khẩu phải có ít nhất 8 ký tự.',
                                    },
                                    validate: value => !/\s/.test(value) || 'Mật khẩu không được chứa dấu cách.',
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        type='password'
                                        placeholder='Mật khẩu'
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid>
                            <Typography variant="body1" component="span">
                                Họ và tên
                                <Typography variant="body1" component="span" color="error">
                                    {' '}(*)
                                </Typography>
                            </Typography>
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: 'Vui lòng nhập họ và tên.' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        placeholder='Họ và tên'
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid>
                            <Typography variant="body1" component="span">
                                Ngày sinh
                                <Typography variant="body1" component="span" color="error">
                                    {' '}(*)
                                </Typography>
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']} sx={{ mb: 2 }}>
                                    <Controller
                                        name="birthDate"
                                        control={control}
                                        rules={{ required: 'Vui lòng chọn ngày sinh.' }}
                                        render={({ field }) => (
                                            <DatePicker
                                                {...field}
                                                value={field.value || dayjs()} // Đảm bảo giá trị không bao giờ là null
                                                onChange={(newValue) => {
                                                    setValue('birthDate', newValue || dayjs()); // Nếu null, thiết lập giá trị là ngày hiện tại
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
                                <Typography variant="body1" component="span" color="error">
                                    {' '}(*)
                                </Typography>
                            </Typography>
                            <Controller
                                name="gender"
                                control={control}
                                rules={{ required: 'Vui lòng nhập giới tính.' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        placeholder='Giới tính'
                                        error={!!errors.gender}
                                        helperText={errors.gender?.message}
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid marginBottom={2}>
                            <Typography variant="body1" component="span">
                                Tỉnh/Thành phố
                                <Typography variant="body1" component="span" color="error">
                                    {' '}(*)
                                </Typography>
                            </Typography>
                            <Controller
                                name="address"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        value={field.value}
                                        onChange={(event) => {
                                            setValue('address', event.target.value);
                                            setAddress(event.target.value);
                                            setDistricts(''); // Reset districts and wards when address changes
                                            setValue('districts', '');
                                            setValue('wards', '');
                                        }}
                                        sx={{ width: '100%' }}
                                    >
                                        {addressData.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </Grid>

                        <Grid marginBottom={2}>
                            <Typography variant="body1" component="span">
                                Quận huyện
                                <Typography variant="body1" component="span" color="error">
                                    {' '}(*)
                                </Typography>
                            </Typography>
                            <Controller
                                name="districts"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        value={field.value}
                                        disabled={!address}
                                        onChange={(event) => {
                                            setValue('districts', event.target.value);
                                            setDistricts(event.target.value);
                                            setValue('wards', '');
                                        }}
                                        sx={{ width: '100%' }}
                                    >
                                        {filteredDistricts.map((item, id) => (
                                            <MenuItem key={id} value={item.id}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </Grid>

                        <Grid marginBottom={2}>
                            <Typography variant="body1" component="span">
                                Xã Phường
                                <Typography variant="body1" component="span" color="error">
                                    {' '}(*)
                                </Typography>
                            </Typography>
                            <Controller
                                name="wards"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        value={field.value}
                                        disabled={!districts}
                                        onChange={(event) => setValue('wards', event.target.value)}
                                        sx={{ width: '100%' }}
                                    >
                                        {filteredWards.map((item, id) => (
                                            <MenuItem key={id} value={item.id}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </Grid>
                        
                        <Grid container justifyContent={'flex-end'}>
                            <Button
                                variant="outlined"
                                color="success"
                                sx={{ mt: 2 }}
                                type="submit"
                            >
                                Tiếp tục {' '}<ArrowForwardIcon></ArrowForwardIcon>
                            </Button>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Register;
