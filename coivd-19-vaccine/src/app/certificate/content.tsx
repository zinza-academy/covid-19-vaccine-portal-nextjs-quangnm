'use client';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {
    Box,
    Grid,
    Typography,
    TableRow,
    TableHead,
    TableContainer,
    TableBody,
    Table,
    Paper,
    Button
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
import qr from '@/asset/image/qrcode-default.png';
import heart from '@/asset/image/heart.png'

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3)
];
function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    textColor="inherit"
                    sx={{ textTransform: 'none' }}>
                    <Tab label="Chứng nhận tiêm chủng" {...a11yProps(0)} />
                    <Tab label="Kết quả đăng ký" {...a11yProps(1)} />
                    <Tab label="Tài khoản" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Grid container justifyContent={'space-between'}>
                    <Grid container md={8} gap={3}>
                        <Grid
                            md={12}
                            display={'flex'}
                            flexDirection={'column'}
                            justifyContent={'center'}
                            alignItems={'center'}>
                            <Typography>
                                CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM
                            </Typography>
                            <Typography fontWeight={'bold'}>
                                Độc lập - Tự do - Hạnh phúc
                            </Typography>
                            <Typography
                                fontWeight={'bold'}
                                fontSize={20}
                                mt={2}>
                                CHỨNG NHẬN TIÊM CHỦNG COVID-19
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            display={'flex'}
                            justifyContent={'space-between'}>
                            <Box>
                                <Typography>Họ và tên</Typography>
                                <Typography fontWeight={'bold'}>
                                    Nguyễn Văn A
                                </Typography>
                            </Box>

                            <Box>
                                <Typography>Ngày sinh</Typography>
                                <Typography fontWeight={'bold'}>
                                    16/10/1994
                                </Typography>
                            </Box>

                            <Box>
                                <Typography>Số CMND/CCCD</Typography>
                                <Typography fontWeight={'bold'}>
                                    0300123456778
                                </Typography>
                            </Box>

                            <Box>
                                <Typography>Số thẻ BHYT</Typography>
                                <Typography fontWeight={'bold'}>
                                    030094005102
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid xs={12} md={12}>
                            <Typography>Địa chỉ</Typography>
                            <Typography fontWeight={'bold'}>
                                Phường Giang Biên - Quận Long Biên - Thành phố
                                Hà Nội
                            </Typography>
                        </Grid>

                        <Grid xs={12} md={12}>
                            <Typography>Kết luận</Typography>
                            <Typography fontWeight={'bold'}>
                                Đã được tiêm phòng vắc xin phòng bệnh Covid-19
                            </Typography>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableRow sx={{ backgroundColor: 'gray' }}>
                                    <StyledTableCell>
                                        <b>Mũi số</b>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <b>Thời gian tiêm</b>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <b>Tên vắc xin</b>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <b>Số lô</b>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <b>Nơi tiêm</b>
                                    </StyledTableCell>
                                </TableRow>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell
                                                component="th"
                                                scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.calories}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.fat}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.carbs}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.protein}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Grid container justifyContent={'center'}>
                            <Button
                                variant="contained"
                                sx={{ borderBottomLeftRadius: 0 }}>
                                Đăng ký mũi tiêm tiếp theo
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 1 > 2 ? '#FFC107' : '#4CAF50',
                                padding: 2,
                                borderRadius: 2,
                                borderBottomLeftRadius: 0,
                                boxShadow: 4,
                                rowGap: 2
                            }}>
                            <Box
                                height={{ xs: '5rem', sm: '9rem' }}
                                width={{ xs: '5rem', sm: '5rem' }}
                                borderRadius={2}
                                sx={{
                                    backgroundImage: `url(${heart.src})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'center'
                                }}
                            />

                            <Typography variant="h6" color={'white'}>
                                ĐÃ TIÊM 2 MŨI VẮC XIN
                            </Typography>

                            <Grid
                                item
                                height={'10rem'}
                                width={'10rem'}
                                bgcolor={'white'}
                                sx={{
                                    backgroundImage: `url(${qr.src})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'center'
                                }}
                            />

                            <Grid
                                container
                                bgcolor={'white'}
                                borderRadius={2}
                                sx={{ borderBottomLeftRadius: 0 }}
                                p={1}
                                rowGap={1}
                                md={11}
                                xs={11}>
                                <Grid item display={'flex'} gap={1} md={12}>
                                    <PersonIcon />
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            color={'black'}>
                                            Họ và tên
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color={'black'}>
                                            <b>Nguyễn Văn A</b>
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item display={'flex'} gap={1} md={12}>
                                    <DateRangeIcon />
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            color={'black'}>
                                            Ngày sinh
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color={'black'}>
                                            <b>16/10/1994</b>
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item display={'flex'} gap={1} md={12}>
                                    <FeaturedVideoIcon />
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            color={'black'}>
                                            Số CMND/CCCD
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color={'black'}>
                                            <b>030012345678 </b>
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableRow sx={{ backgroundColor: 'gray' }}>
                            <StyledTableCell>
                                <b>STT</b>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <b>Họ và tên</b>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <b>Ngày sinh</b>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <b>Giới tính</b>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <b>Số CMND/CCCD/Mã định danh công dân</b>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <b>Trạng thái</b>
                            </StyledTableCell>
                        </TableRow>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.calories}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.fat}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.carbs}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.protein}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box border={1} textAlign={'center'} borderRadius={5} bgcolor={'#E8EAF6'}>Đăng ký thàng công</Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Item Three
            </CustomTabPanel>
        </Box>
    );
}
