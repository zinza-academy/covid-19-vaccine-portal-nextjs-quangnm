'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import bgforget from '@/asset/image/bgforget.jpg';
import {
    Grid,
    Button,
    Box,
    Typography,
    Link,
    TextField,
    Paper,
    Backdrop,
    CircularProgress,
    Alert
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { axiosInstance } from '@/requestMethod';

const schema = yup.object().shape({
    email: yup
        .string()
        .email('Email không hợp lệ')
        .required('Email là bắt buộc'),
    password: yup
        .string()
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .matches(/^\S*$/, 'Mật khẩu không được chứa dấu cách')
        .required('Mật khẩu là bắt buộc'),
});

const Login = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    useEffect(() => {
        if (isValid) {
            setIsSubmitting(false);
        }
    }, [isValid]);

    const handleRegister = () => {
        router.push('/register');
    };

    const onSubmit = async (data: { email: string; password: string }) => {
        setIsSubmitting(true);
        setError(null); 
        if (!isValid) {
            return;
        }

        try {
            handleOpen();
            const response = await axiosInstance.post('/auth/login', data);
            localStorage.setItem('token', response.data.token);
            
            router.push('/home');
        } catch (err: any) {
            setError('Đăng nhập không thành công. Vui lòng thử lại.');
        } finally {
            setIsSubmitting(false);
            handleClose();
        }
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
                    backgroundPosition: 'center',
                }}
            />

            <Grid
                item
                xs={12}
                sm={6}
                md={6}
                component={Paper}
                elevation={6}
                square
                justifyContent="center"
                alignItems="center"
                sx={{ display: 'flex' }}
            >
                <Box
                    sx={{
                        mx: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                        Đăng Nhập Vào Tài Khoản
                    </Typography>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ mt: 1 }}
                    >
                        <Grid>
                            <Typography variant="body1" component="span">
                                Email
                            </Typography>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        required
                                        fullWidth
                                        type="email"
                                        autoComplete="email"
                                        autoFocus
                                        placeholder="user@gmail.com"
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
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        required
                                        fullWidth
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder="password"
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                        sx={{ mb: 3 }}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs container justifyContent="flex-end">
                            <Link href="/forgotpass" variant="body2" underline="hover">
                                Quên mật khẩu?
                            </Link>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="success"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isSubmitting || !isValid}
                        >
                            {isSubmitting ? 'Đăng nhập...' : 'Đăng nhập'}
                        </Button>

                        <Typography component="span" textAlign={'center'}>
                            Hoặc đăng ký tài khoản nếu bạn chưa đăng ký
                        </Typography>

                        <Button
                            fullWidth
                            variant="outlined"
                            color="success"
                            sx={{ mt: 2 }}
                            onClick={handleRegister}
                        >
                            Đăng ký
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Grid>
    );
};

export default Login;
