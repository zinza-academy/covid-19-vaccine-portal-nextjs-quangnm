'use client'
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Link, Button, IconButton, Drawer, List, ListItem, ListItemText, Menu, MenuItem, Avatar, Divider, ListItemIcon, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from '@mui/icons-material/Logout';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [userRole, setUserRole] = useState<string>('');

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        setUserRole(role || '');
    }, []);

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

    return (
        <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #E60012, #001489)' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box display="flex" alignItems="center">
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: {
                                xs: '12px',
                                md: '14px',
                            },
                        }}
                    >
                        {userRole === 'admin' ? 'Xin chào Admin' : 'CỔNG THÔNG TIN TIÊM CHỦNG COVID-19'}
                    </Typography>
                </Box>
                {userRole === 'user' ?
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
                        {['Trang chủ', 'Đăng ký tiêm', 'Tài liệu'].map((text) => (
                            <Link
                                key={text}
                                href="#"
                                color="inherit"
                                underline="none"
                                sx={{
                                    fontSize: {
                                        xs: '12px',
                                        md: '14px',
                                    },
                                }}
                            >
                                {text}
                            </Link>
                        ))}
                        <Button onMouseEnter={handleClick} sx={{ color: 'white', textTransform: 'none', fontSize: { xs: '12px', md: '14px' } }}>
                            Tra cứu
                        </Button>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onMouseLeave={handleClose}>
                            <MenuItem onClick={handleClose}>
                                <PeopleOutlineOutlinedIcon sx={{ mr: 1, color: '#6A1B9A' }} />
                                <Box>
                                    <Typography variant="body1" sx={{ fontSize: { xs: '12px', md: '14px' } }}>Tra cứu chứng nhận tiêm</Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: '10px', md: '12px' } }}>Cập nhật nhanh và chính xác nhất</Typography>
                                </Box>
                                <ArrowForwardOutlinedIcon sx={{ ml: 'auto', color: '#6A1B9A' }} />
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <PeopleOutlineOutlinedIcon sx={{ mr: 1, color: '#1E88E5' }} />
                                <Box>
                                    <Typography variant="body1" sx={{ fontSize: { xs: '12px', md: '14px' } }}>Tra cứu kết quả đăng ký</Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: '10px', md: '12px' } }}>Cập nhật nhanh và chính xác nhất</Typography>
                                </Box>
                                <ArrowForwardOutlinedIcon sx={{ ml: 'auto', color: '#1E88E5' }} />
                            </MenuItem>
                        </Menu>
                        <Button variant="contained" color="primary" sx={{ fontSize: { xs: '12px', md: '14px' } }}>ĐĂNG NHẬP</Button>
                    </Box>
                    :
                    <Box>


                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
                                {['Dữ liệu', 'User', 'Kho'].map((text) => (
                                    <Link
                                        key={text}
                                        href="#"
                                        color="inherit"
                                        underline="none"
                                        sx={{
                                            fontSize: {
                                                xs: '12px',
                                                md: '14px',
                                            },
                                        }}
                                    >
                                        {text}
                                    </Link>
                                ))}
                            </Box>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={handleClose}>
                                <Avatar /> Profile
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Avatar /> My account
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <PersonAdd fontSize="small" />
                                </ListItemIcon>
                                Add another account
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                }

                {/* Mobile Menu */}
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton color="inherit" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                            <List>
                                {['Trang chủ', 'Đăng ký tiêm', 'Tra cứu', 'Tài liệu', 'ĐĂNG NHẬP'].map((text) => (
                                    <ListItem button key={text} component="a" href="#">
                                        <ListItemText primary={text} sx={{ fontSize: { xs: '12px', md: '14px' } }} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Drawer>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;

