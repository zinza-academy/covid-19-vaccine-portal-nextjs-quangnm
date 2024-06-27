'use client'
import { Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

export default function Header() {
    const [value, setValue] = useState(0);
    const [username, setUsername] = useState<string | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user') || 'null');
            setUsername(user?.username || '');
        }
    }, []);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid
            container
            sx={{
                backgroundImage: 'linear-gradient(to right, #f44336, #0000ff)',
                height: '10vh',
                display: 'flex',
                alignItems: 'center',
                color: '#fff',
            }}
        >
            <Grid item xs={4} md={4} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Diversity1OutlinedIcon sx={{ fontSize: '2rem', mr: 1 }} />
                <Typography variant="body1">
                    CỔNG THÔNG TIN TIÊM CHỦNG COVID-19
                </Typography>
            </Grid>
            <Grid item xs={8} md={8} display={'flex'} justifyContent={'flex-end'} >
                <Box sx={{ width: '70%' }}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        sx={{
                            backgroundColor: 'transparent',
                        }}
                    >
                        <BottomNavigationAction label="Trang chủ"
                            sx={{
                                '& .MuiBottomNavigationAction-label': {
                                    fontSize: '1rem',
                                    color: 'white',
                                },
                            }}
                        />
                        <BottomNavigationAction label="Đăng ký tiêm"
                            sx={{
                                '& .MuiBottomNavigationAction-label': {
                                    fontSize: '1rem',
                                    color: 'white',
                                    whiteSpace: 'nowrap'
                                },
                            }}
                        />
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            sx={{
                                color: 'white',
                                textTransform: 'none',
                                fontSize: '1rem',
                                ml: 3
                            }}
                        >
                            Tra cứu <ExpandMoreOutlinedIcon />
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose} >
                                <PeopleOutlineOutlinedIcon sx={{ mr: 1, color: '#4a148c' }} />
                                <Box>
                                    <Typography variant="body1" sx={{ fontSize: 16 }}>
                                        Tra cứu chứng nhận tiêm
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: 12 }}>
                                        Cập nhật nhanh và chính xác nhất
                                    </Typography>
                                </Box>
                                <ArrowForwardOutlinedIcon sx={{ ml: 1, color: '#4a148c' }} />
                            </MenuItem>
                            <MenuItem onClick={handleClose} >
                                <PeopleOutlineOutlinedIcon sx={{ mr: 1, color: '#0d47a1' }} />
                                <Box>
                                    <Typography variant="body1" sx={{ fontSize: 16 }}>
                                        Tra cứu kết quả đăng ký
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: 12 }}>
                                        Cập nhật nhanh và chính xác nhất
                                    </Typography>
                                </Box>
                                <ArrowForwardOutlinedIcon sx={{ ml: 1, color: '#0d47a1' }} />
                            </MenuItem>
                        </Menu>

                        <BottomNavigationAction label="Tài liệu"
                            sx={{
                                '& .MuiBottomNavigationAction-label': {
                                    fontSize: '1rem',
                                    color: 'white',
                                    whiteSpace: 'nowrap'
                                },
                            }}
                        />

                        <BottomNavigationAction
                            label={username ? username : "Đăng nhập"}
                            sx={{
                                '& .MuiBottomNavigationAction-label': {
                                    fontSize: '1rem',
                                    padding: 1,
                                    borderRadius: 1,
                                    color: '#0000ff',
                                    // whiteSpace: 'nowrap',
                                    backgroundColor: 'white'
                                },
                            }}
                        />

                    </BottomNavigation>
                </Box>
            </Grid>
        </Grid>
    );
}
