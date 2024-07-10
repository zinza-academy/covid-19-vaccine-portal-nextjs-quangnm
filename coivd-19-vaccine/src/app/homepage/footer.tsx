'use client';

import * as React from 'react';
import { Grid, Typography, Stack, Button, Box } from '@mui/material';
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';
import boyte from '@/asset/image/yte.png';
import tttt from '@/asset/image/tttt.jpg';
import ncsc from '@/asset/image/ncsc.png';

function Footer() {
    return (
        <Box
            component="footer"
            bgcolor={'#311b92'}
            p={2}
            flexDirection={{ xs: 'column', sm: 'row' }}
            height={{ xs: 'auto', sm: '300px' }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography color="white" fontSize={{ xs: 12, sm: 13 }}>
                        <CopyrightOutlinedIcon sx={{ fontSize: 12 }} /> Bản quyền thuộc
                        <Typography
                            color="white"
                            component="span"
                            fontWeight={600}
                            fontSize={{ xs: 12, sm: 14 }}
                        >
                            {' '}
                            TRUNG TÂM CÔNG NGHỆ PHÒNG, CHỐNG DỊCH COVID-19 QUỐC GIA
                        </Typography>
                    </Typography>
                    <Typography color="white" fontSize={{ xs: 12, sm: 13 }}>
                        Phát triển bởi
                        <Typography
                            color="error"
                            component="span"
                            fontWeight={600}
                            fontSize={{ xs: 12, sm: 13 }}
                        >
                            {' '}
                            Viettel
                        </Typography>
                    </Typography>
                    <Stack direction="row" spacing={2} mt={2}>
                        <Box
                            sx={{
                                height: { xs: '3rem', sm: '5rem' },
                                width: { xs: '3rem', sm: '5rem' },
                                borderRadius: 50,
                                bgcolor: 'white',
                                backgroundImage: `url(${boyte.src})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                            }}
                        />
                        <Box
                            sx={{
                                height: { xs: '3rem', sm: '5rem' },
                                width: { xs: '3rem', sm: '5rem' },
                                borderRadius: 50,
                                bgcolor: 'white',
                                backgroundImage: `url(${tttt.src})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                            }}
                        />
                    </Stack>
                </Grid>

                <Grid
                    item
                    xs={12}
                    sm={6}
                    display="flex"
                    flexDirection="column"
                    alignItems={{ xs: 'center', sm: 'flex-end' }}
                    justifyContent="center"
                >
                    <Typography
                        color="white"
                        fontSize={{ xs: 12, sm: 13 }}
                        textAlign={{ xs: 'center', sm: 'end' }}
                        mb={2}
                    >
                        Tải sổ sức khoẻ điện tử để đăng ký tiêm và nhận giấy chứng nhận tiêm
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent={{ xs: 'center', sm: 'flex-end' }}
                        alignItems="center"
                        mb={2}
                    >
                        <Button
                            variant="outlined"
                            sx={{
                                color: '#fff',
                                borderColor: '#fff',
                                textTransform: 'none',
                                borderRadius: 2,
                                borderBottomLeftRadius: 0,
                                fontSize: { xs: '10px', sm: '14px' },
                                '&:hover': {
                                    borderColor: '#fff',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                },
                            }}
                        >
                            App tiêm di động (Cho HCM)
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{
                                color: '#fff',
                                borderColor: '#fff',
                                textTransform: 'none',
                                borderRadius: 2,
                                borderBottomLeftRadius: 0,
                                fontSize: { xs: '10px', sm: '14px' },
                                '&:hover': {
                                    borderColor: '#fff',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                },
                            }}
                        >
                            App Store
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{
                                color: '#fff',
                                borderColor: '#fff',
                                textTransform: 'none',
                                borderRadius: 2,
                                borderBottomLeftRadius: 0,
                                fontSize: { xs: '10px', sm: '14px' },
                                '&:hover': {
                                    borderColor: '#fff',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                },
                            }}
                        >
                            Google Play
                        </Button>
                    </Stack>
                    <Box
                        height={{ xs: '5rem', sm: '9rem' }}
                        width={{ xs: '10rem', sm: '20rem' }}
                        bgcolor="white"
                        borderRadius={2}
                        sx={{
                            backgroundImage: `url(${ncsc.src})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Footer;
