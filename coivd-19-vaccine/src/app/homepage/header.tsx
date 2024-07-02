'use client';
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Link, Button, IconButton, Drawer, List, ListItem, ListItemText, Menu, MenuItem, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

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
                        CỔNG THÔNG TIN TIÊM CHỦNG COVID-19
                    </Typography>
                </Box>

                {/* Desktop Navigation */}
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
