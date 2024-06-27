'use client'
import * as React from 'react';
import { Grid, Typography, Stack, Button, Box } from "@mui/material";
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';
import boyte from '@/asset/image/yte.png';
import tttt from '@/asset/image/tttt.jpg';
import ncsc from '@/asset/image/ncsc.png';

function Footer() {

    return (
        <Grid container bgcolor={'#311b92'} height={'300px'} p={2} >
            <Grid xs={6} md={6}>
                <Typography color="white" fontSize={13}>
                    <CopyrightOutlinedIcon sx={{ fontSize: 13 }} /> Bản quyền thuộc
                    <Typography color="white" component={'span'} fontWeight={600} fontSize={13}>
                        {' '}TRUNG TÂM CÔNG NGHỆ PHÒNG, CHỐNG DỊCH COVID-19 QUỐC GIA
                    </Typography>
                </Typography>
                <Typography color="white" fontSize={13}>
                    Phát triển bởi
                    <Typography color="error" component={'span'} fontWeight={600} fontSize={13}>
                        {' '}Viettel
                    </Typography>
                </Typography>
                <Grid container display={'flex'} columnGap={2}>
                    <Grid
                        item
                        height={'5rem'}
                        width={'5rem'}
                        borderRadius={50}
                        bgcolor={'white'}
                        mt={2}
                        sx={{
                            backgroundImage: `url(${boyte.src})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid
                        item
                        height={'5rem'}
                        width={'5rem'}
                        borderRadius={50}
                        bgcolor={'white'}
                        mt={2}
                        sx={{
                            backgroundImage: `url(${tttt.src})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                        }}
                    />
                </Grid>
            </Grid>

            <Grid xs={6} md={6} alignItems={'end'}>
                <Typography color="white" fontSize={13} textAlign={'end'}>
                    Tải sổ sức khoẻ điện tử để đăng ký tiêm và nhận giấy chứng nhận tiêm
                </Typography>

                <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center" sx={{ margin: '20px 0' }}>
                    <Button
                        variant="outlined"
                        sx={{
                            color: '#fff',
                            borderColor: '#fff',
                            textTransform: 'none',
                            borderRadius: 2,
                            borderBottomLeftRadius: 0,
                            '&:hover': {
                                borderColor: '#fff',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            }
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
                            '&:hover': {
                                borderColor: '#fff',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            }
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
                            '&:hover': {
                                borderColor: '#fff',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            }
                        }}
                    >
                        Google Play
                    </Button>
                </Stack>
                <Grid container justifyContent={'end'}>
                    <Grid
                        item
                        height={'9rem'}
                        width={'20rem'}
                        bgcolor={'white'}
                        borderRadius={2}
                        mt={2}
                        sx={{
                            backgroundImage: `url(${ncsc.src})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                        }}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}
export default Footer