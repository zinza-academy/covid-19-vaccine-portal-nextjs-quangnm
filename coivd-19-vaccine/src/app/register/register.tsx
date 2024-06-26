'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import bgforget from '@/asset/image/bgforget.jpg';
import { Grid, Button, Box, Typography, Link, TextField, Paper } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const Register = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ cmnd: '', email: '', password: '', form: '' });
    const [token, setToken] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<Dayjs | null>(dayjs('2022-04-17'));
    const [address, setAddress] = useState('');
    const [districts, setDistricts] = useState('')
    const [wards, setWard] = useState('')
    const [cmnd, setCmnd] = useState('');

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
        { id: 109, cityId: 3, name: 'S  ơn Trà' },
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

    console.log(filteredDistricts)

    const filteredWards = dataWards.filter((item) => item.districtId.toString() == districts);

    const handleChange = (event: SelectChangeEvent) => {
        setAddress(event.target.value);
    };

    console.log(address)

    const handleChangeDistricts = (event: SelectChangeEvent) => {
        setDistricts(event.target.value);
    };

    const handleChangeWards = (event: SelectChangeEvent) => {
        setWard(event.target.value);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        validateForm(email, password, cmnd);
    }, [email, password, cmnd]);


    const validateForm = (email: any, password: any, cmnd : any) => {
        let isValid = true;
        let emailError = '';
        let passwordError = '';
        let cmndError = '';

        const cmndPattern = /^\d{9}$|^\d{12}$/;
        if (!cmndPattern.test(cmnd)) {
            cmndError ='Số CMND/CCCD không hợp lệ. Vui lòng nhập lại.';
            isValid = false;
        }

        if (!emailPattern.test(email)) {
            emailError = 'Email không hợp lệ';
            isValid = false;
        }

        if (password.trim().length < 8 || /\s/.test(password)) {
            passwordError = 'Mật khẩu phải có ít nhất 8 ký tự và không có dấu cách';
            isValid = false;
        }

        setError( { cmnd: cmndError, email: emailError, password: passwordError, form: '' });
        setIsFormValid(isValid);
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
                        // my: 20,
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

                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <Grid>
                            <Typography variant="body1" component="span">
                                Số CMND/CCCD
                                <Typography variant="body1" component="span" color="error">
                                    {' '}(*)
                                </Typography>
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                value={cmnd}
                                onChange={(e) => setCmnd(e.target.value)}
                                error={!!error.cmnd}
                                helperText={error.cmnd}
                                autoFocus
                                placeholder='Số CMND/CCCD'
                                sx={{ mb: 2 }}
                            />
                        </Grid>

                        <Grid>
                            <Typography variant="body1" component="span">
                                Email
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                type='email'
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                                placeholder='user@gmail.com'
                                error={!!error.email}
                                helperText={error.email}
                                sx={{ mb: 2 }}
                            />
                        </Grid>

                        <Grid>
                            <Typography variant="body1" component="span">
                                Mật khẩu
                            </Typography>
                            <TextField
                                // margin="normal"
                                required
                                fullWidth
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                // label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                placeholder='password'
                                error={!!error.password}
                                helperText={error.password}
                                sx={{ mb: 3 }}
                            />
                        </Grid>

                        <Grid>
                            <Typography variant="body1" component="span">
                                Họ và tên
                                <Typography variant="body1" component="span" color="error">
                                    {' '}(*)
                                </Typography>
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                                placeholder='Họ và tên'
                                sx={{ mb: 2 }}
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
                                    <DatePicker
                                        value={value}
                                        onChange={(newValue) => setValue(newValue)}
                                        sx={{ width: '100%' }}
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
                            <TextField
                                required
                                fullWidth
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                                placeholder='Giới tính'
                                sx={{ mb: 2 }}
                            />
                        </Grid>

                        <Grid marginBottom={2}>
                            <Typography variant="body1" component="span">
                                Tỉnh/Thành phố
                                <Typography variant="body1" component="span" color="error">
                                    {' '}(*)
                                </Typography>
                            </Typography>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={address}
                                // label="Age"
                                onChange={handleChange}
                                sx={{ width: '100%' }}
                            >
                                {addressData.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>

                        <Grid marginBottom={2}>
                            <Typography variant="body1" component="span">
                                Quận huyện
                                <Typography variant="body1" component="span" color="error">
                                    {' '}(*)
                                </Typography>
                            </Typography>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={districts}
                                // label="Age"
                                disabled={!address}
                                onChange={handleChangeDistricts}
                                sx={{ width: '100%' }}
                            >
                                {filteredDistricts.map((item, id) => (
                                    <MenuItem key={id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>

                        <Grid marginBottom={2}>
                            <Typography variant="body1" component="span">
                                Xã Phường
                                <Typography variant="body1" component="span" color="error">
                                    {' '}(*)
                                </Typography>
                            </Typography>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={wards}
                                // label="Age"
                                placeholder='Xã Phường'
                                disabled={!districts}
                                onChange={handleChangeWards}
                                sx={{ width: '100%' }}
                            >
                                {filteredWards.map((item, id) => (
                                    <MenuItem key={id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Box>
                    <Grid container justifyContent={'flex-end'}>
                        <Button
                            variant="outlined"
                            color="success"
                            sx={{ mt: 2 }}
                        >
                            Tiếp tục {' '}<ArrowForwardIcon></ArrowForwardIcon>
                        </Button>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Register;
