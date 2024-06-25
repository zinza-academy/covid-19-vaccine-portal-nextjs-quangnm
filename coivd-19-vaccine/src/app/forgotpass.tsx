'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import bgforget from '@/asset/image/bgforget.jpg';
import { Grid, Button, Box, Input } from '@mui/material';

const Forgotpass = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        setIsFormValid(emailPattern.test(email));
    }, [email]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            alert('Email is required');
            return;
        }

        setIsSubmitting(true);


        setTimeout(() => {
            setIsSubmitting(false);
            router.push('');
        }, 2000);
    };

    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={4}
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
                xs={false}
                sm={8}
                md={6}
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ display: 'flex' }}
            >
                <Box component="form" onSubmit={handleSubmit} className="w-75">
                    <Grid className="text-center mb-3">
                        <span>
                            Để khôi phục mật khẩu, vui lòng đăng nhập đúng email đã dùng để đăng ký
                            <span className="text-danger"> (*)</span>
                        </span>
                    </Grid>
                    <Input
                        type="email"
                        placeholder="user@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control mb-3"
                        required
                    />
                    <Grid
                        item
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ display: 'flex' }}
                    >

                        <Button variant="outlined" sx={{ marginRight: 1 }} onClick={() => router.back()}>
                            Quay lại
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting || !isFormValid}
                        >
                            {isSubmitting ? 'Gửi...' : 'Gửi'}
                        </Button>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Forgotpass;
