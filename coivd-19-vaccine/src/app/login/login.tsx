'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import bgforget from '@/asset/image/bgforget.jpg';
import { Grid, Button, Box, Typography, Link, TextField,  Paper } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ email: '', password: '', form: '' });
    const [token, setToken] = useState<string | null>(null);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        validateForm(email, password);
    }, [email, password]);


    const validateForm = (email: any, password: any) => {
        let isValid = true;
        let emailError = '';
        let passwordError = '';

        if (!emailPattern.test(email)) {
            emailError = 'Email không hợp lệ';
            isValid = false;
        }

        if (password.trim().length < 8 || /\s/.test(password)) {
            passwordError = 'Mật khẩu phải có ít nhất 8 ký tự và không có dấu cách';
            isValid = false;
        }

        setError({ email: emailError, password: passwordError, form: '' });
        setIsFormValid(isValid);
    };

    console.log(error)

    const handleRegister = () => {
        router.push('/register')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isFormValid) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call for login
            const fakeApiResponse = await new Promise<{ token: string }>((resolve, reject) => setTimeout(() => {
                // Simulate success (resolve) or failure (reject)
                const isSuccess = true; // Change this to `false` to simulate failure
                if (isSuccess) {
                    handleOpen()
                    resolve({ token: 'sample_token_123456' });  // Simulated token
                } else {
                    reject(new Error('Đăng nhập không thành công. Vui lòng thử lại.'));
                }
            }, 2000));

            // On successful login, store token in local storage and state
            const { token } = fakeApiResponse;
            localStorage.setItem('token', token);
            setToken(token);

            // Redirect to homepage
            router.push('/user');
        } catch (err: any) {
            // Set form-level error message
            setError({ ...error, form: err.message || 'Đăng nhập không thành công. Vui lòng thử lại.' });
        } finally {
            setIsSubmitting(false);
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
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                        Đăng Nhập Vào Tài Khoản
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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

                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}

                        <Grid item xs container justifyContent="flex-end">
                            <Link href="/forgotpass" variant="body2" underline="hover" >
                                Quên mật khẩu?
                            </Link>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="success"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isSubmitting || !isFormValid}
                        >
                            {isSubmitting ? 'Đăng nhập...' : 'Đăng nhập'}
                        </Button>

                        {error.form && (
                            <Typography color="error" variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                                {error.form}
                            </Typography>
                        )}

                        <Typography component="span" textAlign={'center'}>
                            Hoặc đăng ký tài khoản nếu bạn chưa đăng ký
                        </Typography>

                        <Button
                            fullWidth
                            variant="outlined"
                            color="success"
                            sx={{mt: 2}}
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
