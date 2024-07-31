'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import bgforget from '@/asset/image/bgforget.jpg';
import { Grid, Button, Box, TextField, Typography, Alert } from '@mui/material';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { forgotPasswordAsync } from '@/features/user/forgotpassSlice';
import { indigo } from '@mui/material/colors';
import { LoadingButton } from '@mui/lab';

const defaultValues = {
    email: ''
};

const schema = yup.object({
    email: yup.string().required().email()
});

const Forgotpass = () => {
    const router = useRouter();
    const loadingStatus = useAppSelector((state) => state.forgotPassword.loading);
    const message = useAppSelector((state) => state.forgotPassword.message);
    const dispatch = useAppDispatch();

    const {
        control,
        handleSubmit,
        formState: { isValid }
    } = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: {email: string}) => {
        await dispatch(forgotPasswordAsync(data));
    };

    const handleBack = () => {
        router.push('/');
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
                xs={12}
                sm={6}
                md={6}
                direction="row"
                justifyContent="center"
                alignItems="center"
                display={'flex'}
                >
                  
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    justifyContent="center"
                    alignItems="center"
                    flexDirection={'column'}
                    display={'flex'}
                    >
                    {message && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {message}
                        </Alert>
                    )}
                    <Grid textAlign={'center'} width={'80%'}>
                        <Typography variant="body1" component="span">
                            Để khôi phục mật khẩu, vui lòng đăng nhập đúng email
                            đã dùng để đăng ký
                            <Typography
                                variant="body1"
                                component="span"
                                color="error">
                                {' '}
                                (*)
                            </Typography>
                        </Typography>
                    </Grid>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                sx={{
                                    width: '80%',
                                    marginTop: 1,
                                }}
                                {...field}
                                error={!!error}
                                helperText={error?.message}
                            />
                        )}
                    />
                    <Grid
                        item
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ display: 'flex' }}>
                        <Button
                            onClick={handleBack}
                            variant="outlined"
                            sx={{
                                margin: '12px  16px 12px 0',
                                borderColor: indigo[400],
                                borderRadius: '8px',
                                borderBottomLeftRadius: '0px',  
                                '&:hover': {
                                    borderColor: indigo[500],
                                    backgroundColor: '#fff'
                                }
                            }}>
                            Quay lại
                        </Button>
                        <LoadingButton
                            loading={loadingStatus}
                            type="submit"
                            disabled={!isValid}
                            sx={{
                                color: '#fff',
                                backgroundColor: indigo[600],
                                margin: '12px 0',
                                borderRadius: '8px',
                                borderBottomLeftRadius: '0px',  
                                '&:hover': {
                                    backgroundColor: indigo[700]
                                }
                            }}>
                            Gửi
                        </LoadingButton>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Forgotpass;
