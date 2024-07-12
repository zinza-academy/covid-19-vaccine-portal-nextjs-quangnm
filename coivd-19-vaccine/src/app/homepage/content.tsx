'use client';

import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import {
    Grid,
    Box,
    Typography,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Divider
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import LineChart from './component/linechart';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider
} from '@mui/material/styles';
import { ThumbUpOutlined } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flexGrow: 1,
    padding: theme.spacing(4),
    borderRadius: 0
}));

const vaccinationData = [
    {
        id: 1,
        name: 'Bệnh viện Đa khoa Medlatec',
        address: '42-44 Nghĩa Dũng',
        ward: 'Phúc Xá',
        district: 'Quận Ba Đình',
        city: 'Thành phố Hà Nội',
        inCharge: 'Nguyễn Thị Kim Liên',
        booths: 1
    },
    {
        id: 2,
        name: 'Trung tâm Y tế Quận 1',
        address: '123 Đinh Tiên Hoàng',
        ward: 'Đa Kao',
        district: 'Quận 1',
        city: 'Thành phố Hồ Chí Minh',
        inCharge: 'Trần Văn Anh',
        booths: 2
    },
    {
        id: 3,
        name: 'Bệnh viện Vinmec',
        address: '458 Minh Khai',
        ward: 'Vĩnh Tuy',
        district: 'Quận Hai Bà Trưng',
        city: 'Thành phố Hà Nội',
        inCharge: 'Phạm Thị Lan',
        booths: 3
    },
    {
        id: 4,
        name: 'Trung tâm Y tế Quận 7',
        address: '200 Nguyễn Thị Thập',
        ward: 'Tân Phú',
        district: 'Quận 7',
        city: 'Thành phố Hồ Chí Minh',
        inCharge: 'Nguyễn Văn Nam',
        booths: 2
    },
    {
        id: 5,
        name: 'Bệnh viện Bạch Mai',
        address: '78 Giải Phóng',
        ward: 'Phương Mai',
        district: 'Quận Đống Đa',
        city: 'Thành phố Hà Nội',
        inCharge: 'Nguyễn Minh Châu',
        booths: 5
    },
    {
        id: 6,
        name: 'Bệnh viện Quận Thủ Đức',
        address: '29 Phạm Văn Đồng',
        ward: 'Bình Thọ',
        district: 'Thành phố Thủ Đức',
        city: 'Thành phố Hồ Chí Minh',
        inCharge: 'Lê Văn Tuấn',
        booths: 4
    },
    {
        id: 7,
        name: 'Bệnh viện Quận Bình Thạnh',
        address: '234 Bạch Đằng',
        ward: 'Phường 14',
        district: 'Quận Bình Thạnh',
        city: 'Thành phố Hồ Chí Minh',
        inCharge: 'Phan Thị Hà',
        booths: 3
    },
    {
        id: 8,
        name: 'Trung tâm Y tế Quận Gò Vấp',
        address: '345 Lê Đức Thọ',
        ward: 'Phường 6',
        district: 'Quận Gò Vấp',
        city: 'Thành phố Hồ Chí Minh',
        inCharge: 'Nguyễn Thị Phương',
        booths: 4
    },
    {
        id: 9,
        name: 'Bệnh viện Đa khoa Hồng Ngọc',
        address: '55 Yên Ninh',
        ward: 'Quán Thánh',
        district: 'Quận Ba Đình',
        city: 'Thành phố Hà Nội',
        inCharge: 'Nguyễn Tuấn Anh',
        booths: 3
    },
    {
        id: 10,
        name: 'Trung tâm Y tế Quận Phú Nhuận',
        address: '20 Hoàng Văn Thụ',
        ward: 'Phường 9',
        district: 'Quận Phú Nhuận',
        city: 'Thành phố Hồ Chí Minh',
        inCharge: 'Lê Thị Hồng',
        booths: 2
    }
];

function Content() {
    const [address, setAddress] = useState('');
    const [districts, setDistricts] = useState('');
    const [wards, setWard] = useState('');
    const [dataVaccin, setDataVaccin] = useState(vaccinationData);
    const [visibleRows, setVisibleRows] = useState(5);

    const addressData = [
        { id: 1, name: 'Thành phố Hà Nội' },
        { id: 2, name: 'Thành phố Hồ Chí Minh' },
        { id: 3, name: 'Đà Nẵng' }
    ];

    const dataDistricts = [
        { id: 101, cityId: 1, name: 'Ba Đình' },
        { id: 102, cityId: 1, name: 'Hoàn Kiếm' },
        { id: 103, cityId: 1, name: 'Quận Hai Bà Trưng' },
        { id: 104, cityId: 2, name: 'Quận 1' },
        { id: 105, cityId: 2, name: 'Quận 2' },
        { id: 106, cityId: 2, name: 'Quận 3' },
        { id: 107, cityId: 3, name: 'Hải Châu' },
        { id: 108, cityId: 3, name: 'Thanh Khê' },
        { id: 109, cityId: 3, name: 'S  ơn Trà' }
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
        { id: 1018, districtId: 109, name: 'Phước Mỹ' }
    ];

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14
        }
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        },
        '&:last-child td, &:last-child th': {
            border: 0
        }
    }));

    const data = [
        { date: '20/6', quantity: 30 },
        { date: '21/6', quantity: 45 },
        { date: '22/6', quantity: 50 },
        { date: '23/6', quantity: 40 },
        { date: '24/6', quantity: 60 },
        { date: '25/6', quantity: 70 },
        { date: '26/6', quantity: 55 },
        { date: '27/6', quantity: 48 },
        { date: '28/6', quantity: 62 },
        { date: '29/6', quantity: 53 },
        { date: '30/6', quantity: 68 },
        { date: '1/7', quantity: 75 },
        { date: '2/7', quantity: 72 },
        { date: '3/7', quantity: 65 },
        { date: '4/7', quantity: 58 },
        { date: '5/7', quantity: 63 },
        { date: '6/7', quantity: 70 },
        { date: '7/7', quantity: 78 },
        { date: '8/7', quantity: 82 },
        { date: '9/7', quantity: 79 },
        { date: '10/7', quantity: 85 },
        { date: '11/7', quantity: 88 },
        { date: '12/7', quantity: 92 }
    ];

    const handleChange = (event: SelectChangeEvent) => {
        setAddress(event.target.value);
    };

    const handleChangeDistricts = (event: SelectChangeEvent) => {
        setDistricts(event.target.value);
    };

    const handleChangeWards = (event: SelectChangeEvent) => {
        setWard(event.target.value);
    };

    const handleSearch = () => {
        let filteredData = vaccinationData;

        if (address) {
            filteredData = filteredData.filter(
                (item) =>
                    item.city ===
                    addressData.find((city) => city.id.toString() == address)
                        ?.name
            );
        }

        if (districts) {
            filteredData = filteredData.filter(
                (item) =>
                    item.district ===
                    dataDistricts.find(
                        (district) => district.id.toString() == districts
                    )?.name
            );
        }

        if (wards) {
            filteredData = filteredData.filter(
                (item) =>
                    item.ward ===
                    dataWards.find((ward) => ward.id.toString() === wards)?.name
            );
        }

        setDataVaccin(filteredData);
    };

    return (
        <Grid
            container
            display={'flex'}
            justifyContent={'center'}
            alignContent={'center'}
            alignItems={'center'}
            mt={5}
            paddingBottom={5}>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                width={'100%'}
                useFlexGap
                flexWrap="wrap">
                <Item>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                            <GroupAddOutlinedIcon
                                sx={{ fontSize: '2rem', color: '#0d47a1' }}
                            />
                        </Grid>
                        <Grid item>
                            <Typography color="black" fontWeight="bold">
                                Đối tượng đăng ký tiêm
                            </Typography>
                            <Box display="flex" alignItems="baseline">
                                <Typography
                                    variant="h5"
                                    color="black"
                                    fontWeight="bold">
                                    11,203,873
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="black"
                                    fontWeight="bold"
                                    fontStyle={'italic'}
                                    fontSize={12}>
                                    (lượt)
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Item>
                <Item>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                            <VaccinesOutlinedIcon
                                sx={{ fontSize: '2rem', color: '#0d47a1' }}
                            />
                        </Grid>
                        <Grid item>
                            <Typography color="black" fontWeight="bold">
                                Số mũi tiêm hôm qua
                            </Typography>
                            <Box display="flex" alignItems="baseline">
                                <Typography
                                    variant="h5"
                                    color="black"
                                    fontWeight="bold">
                                    1,762,119
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="black"
                                    fontWeight="bold"
                                    fontStyle={'italic'}
                                    fontSize={12}>
                                    (mũi)
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Item>
                <Item>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                            <GroupAddOutlinedIcon
                                sx={{ fontSize: '2rem', color: '#0d47a1' }}
                            />
                        </Grid>
                        <Grid item>
                            <Typography color="black" fontWeight="bold">
                                Đối tượng đăng ký tiêm
                            </Typography>
                            <Box display="flex" alignItems="baseline">
                                <Typography
                                    variant="h5"
                                    color="black"
                                    fontWeight="bold">
                                    11,203,873
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="black"
                                    fontWeight="bold"
                                    fontStyle={'italic'}
                                    fontSize={12}>
                                    (lượt)
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Item>
            </Stack>

            <Grid
                item
                xs={12}
                md={12}
                display="flex"
                justifyContent="center"
                mt={5}>
                <Box
                    boxShadow={4}
                    borderRadius={2}
                    p={3}
                    bgcolor="background.paper"
                    width={'100%'}>
                    <LineChart data={data} />
                </Box>
            </Grid>

            <Grid
                container
                boxShadow={4}
                borderRadius={2}
                p={3}
                bgcolor="background.paper"
                width={'100%'}
                mt={5}
                rowGap={2}>
                <Typography color="black" fontWeight="bold">
                    Tra cứu điểm tiêm theo địa bàn
                </Typography>
                <Grid container spacing={2} alignContent={'center'}>
                    <Grid item xs={2}>
                        <Select
                            labelId="address-select-label"
                            id="address-select"
                            value={address || ''}
                            onChange={handleChange}
                            fullWidth
                            displayEmpty
                            sx={{ height: 35 }}>
                            <MenuItem value="" sx={{ color: 'gray' }}>
                                Tỉnh/Thành phố
                            </MenuItem>
                            {addressData.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={2}>
                        <Select
                            labelId="districts-select-label"
                            id="districts-select"
                            value={districts}
                            onChange={handleChangeDistricts}
                            fullWidth
                            displayEmpty
                            sx={{ height: 35 }}>
                            <MenuItem value="" sx={{ color: 'gray' }}>
                                Quận/Huyện
                            </MenuItem>
                            {dataDistricts.map((item, id) => (
                                <MenuItem key={id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={2}>
                        <Select
                            labelId="wards-select-label"
                            id="wards-select"
                            value={wards}
                            onChange={handleChangeWards}
                            fullWidth
                            placeholder="Xã Phường"
                            displayEmpty
                            sx={{ height: 35 }}>
                            <MenuItem value="" sx={{ color: 'gray' }}>
                                Xã/Phường
                            </MenuItem>
                            {dataWards.map((item, id) => (
                                <MenuItem key={id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={handleSearch}
                            sx={{
                                borderRadius: 2,
                                borderBottomLeftRadius: 0,
                                padding: '5px 15px',
                                display: 'flex',
                                alignItems: 'center',
                                textTransform: 'none'
                            }}>
                            <SearchOutlinedIcon />
                            <Typography variant="body1" component={'span'}>
                                Tìm kiếm
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>

                <TableContainer component={Paper}>
                    <Table sx={{ width: '100%' }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }}>
                                    STT
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }}>
                                    Tên điểm tiêm
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }}>
                                    Số nhà, tên đường
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }}>
                                    Xã/Phường
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }}>
                                    Quận/Huyện
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>
                                    Thành phố
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }}>
                                    Người đứng đầu cơ sở tiêm chủng
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }}>
                                    Số bàn tiêm
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {dataVaccin
                                .slice(0, visibleRows)
                                .map((item, index) => (
                                    <StyledTableRow key={item.id}>
                                        <StyledTableCell
                                            sx={{ textAlign: 'center' }}>
                                            {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{ textAlign: 'center' }}>
                                            {item.name}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{ textAlign: 'center' }}>
                                            {item.address}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{ textAlign: 'center' }}>
                                            {item.ward}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{ textAlign: 'center' }}>
                                            {item.district}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{ textAlign: 'center' }}>
                                            {item.city}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{ textAlign: 'center' }}>
                                            {item.inCharge}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{ textAlign: 'center' }}>
                                            {item.booths}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {visibleRows < data.length && (
                    <Button
                        onClick={() => setVisibleRows(visibleRows + 5)}
                        sx={{ mt: 2 }}>
                        Tải thêm
                    </Button>
                )}
            </Grid>
        </Grid>
    );
}

export default Content;
