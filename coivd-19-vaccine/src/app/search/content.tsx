'use client';
import React from 'react';
import {
    Grid,
    Typography,
    Stepper,
    Step,
    StepButton,
    Button,
    Box,
    StepLabel,
    TextField,
    MenuItem,
    Stack,
    FormControlLabel,
    Checkbox,
    Select,
    FormControl,
    FormHelperText
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    CheckCircleOutline,
    LocalHospital,
    NewReleases
} from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { vaccineRegistrationAsync } from '@/features/user/vaccineRegistrationSlice';
import { useAppDispatch } from '@/redux/hooks';

interface RegistrationInfo {
    user_id: number;
    priority_group: string;
    health_insurance: string;
    career: string;
    work_place: string;
    address: string;
    expected_date: string;
    session: string;
}

const defaultValues = {
    user_id: 0,
    priority_group: '',
    health_insurance: '',
    career: '',
    work_place: '',
    address: '',
    expected_date: '',
    session: ''
};

const schema = yup
    .object({
        priority_group: yup
            .string()
            .required('priority_group is required field'),
        health_insurance: yup.string().required(),
        career: yup.string().required(),
        work_place: yup.string().required(),
        address: yup.string().required(),
        expected_date: yup.string().required('Date is required field'),
        session: yup.string().required(),
        user_id: yup.number().required()
    })
    .required();

const steps = ['Thông tin cá nhân', 'Phiếu đồng ý tiêm', 'Hoàn thành'];
function Content() {
    const dispatch = useAppDispatch();

    const userJSON = localStorage.getItem('user');
    if (userJSON) {
        const user = JSON.parse(userJSON);
        
        defaultValues.address = user.ward.name || '';
        defaultValues.user_id = user.id || 0
    }

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean;
    }>({});

    const totalSteps = () => steps.length;
    const completedSteps = () => Object.keys(completed).length;
    const isLastStep = () => activeStep === totalSteps() - 1;
    const allStepsCompleted = () => completedSteps() === totalSteps();

    const handleStep = (step: number) => () => setActiveStep(step);
    const handleBack = () =>
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };
    const {
        control,
        handleSubmit,
        formState: { isValid },
        getValues
    } = useForm<RegistrationInfo>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const onSubmit = (data: RegistrationInfo) => {
        const { ...RegistrationInfo } = data;
        dispatch(vaccineRegistrationAsync(RegistrationInfo));
    };

    const handleCheckValues = () => {
        console.log(getValues());
    };

    console.log('Form valid:', isValid);

    return (
        <Grid container>
            <Grid
                item
                mt={5}
                mb={5}
                bgcolor={'#eeeeee'}
                pt={1}
                pb={1}
                width={'100%'}
                display={'flex'}
                justifyContent={'center'}>
                <Typography variant="h6" width={'94%'}>
                    Tra cứu đăng ký tiêm
                </Typography>
            </Grid>

            <Box
                sx={{ width: '100%' }}
                component="form"
                onSubmit={handleSubmit(onSubmit)}>
                <Stepper nonLinear activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton
                                color="inherit"
                                onClick={handleStep(index)}>
                                <StepLabel>{label}</StepLabel>
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>

                {activeStep === 0 && (
                    <Grid container justifyContent={'center'} mt={4}>
                        <Grid width={'92%'}>
                            <Grid container sx={{ rowGap: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    1. Thông tin người đăng ký tiêm
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Controller
                                            name="priority_group"
                                            control={control}
                                            render={({
                                                field,
                                                fieldState: { error }
                                            }) => (
                                                <FormControl
                                                    sx={{ width: '100%' }}>
                                                    <Select
                                                        defaultValue=""
                                                        sx={{
                                                            width: '100%'
                                                        }}
                                                        size="small"
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        {...field}
                                                        onChange={(event) => {
                                                            field.onChange(
                                                                event.target
                                                                    .value
                                                            );
                                                        }}>
                                                        <MenuItem
                                                            value={'Không mũi'}>
                                                            Không mũi
                                                        </MenuItem>
                                                        <MenuItem
                                                            value={'Một mũi'}>
                                                            Một mũi
                                                        </MenuItem>
                                                        <MenuItem
                                                            value={'Hai mũi'}>
                                                            Hai mũi
                                                        </MenuItem>
                                                        <MenuItem
                                                            value={'Ba mũi'}>
                                                            Ba mũi
                                                        </MenuItem>
                                                    </Select>
                                                    {error && (
                                                        <FormHelperText
                                                            sx={{
                                                                color: 'red'
                                                            }}>
                                                            {error?.message}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Controller
                                            name="health_insurance"
                                            control={control}
                                            render={({
                                                field,
                                                fieldState: { error }
                                            }) => (
                                                <TextField
                                                    sx={{ width: '100%' }}
                                                    placeholder="Số thẻ BHYT"
                                                    size="small"
                                                    {...field}
                                                    error={!!error}
                                                    helperText={error?.message}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Controller
                                            name="career"
                                            control={control}
                                            render={({
                                                field,
                                                fieldState: { error }
                                            }) => (
                                                <TextField
                                                    sx={{
                                                        width: '100%'
                                                    }}
                                                    placeholder="Nghề nghiệp"
                                                    size="small"
                                                    {...field}
                                                    error={!!error}
                                                    helperText={error?.message}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Controller
                                            name="work_place"
                                            control={control}
                                            render={({
                                                field,
                                                fieldState: { error }
                                            }) => (
                                                <TextField
                                                    sx={{
                                                        width: '100%'
                                                    }}
                                                    placeholder="Đơn vị công tác"
                                                    size="small"
                                                    {...field}
                                                    error={!!error}
                                                    helperText={error?.message}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Controller
                                            name="address"
                                            control={control}
                                            render={({
                                                field,
                                                fieldState: { error }
                                            }) => (
                                                <TextField
                                                    sx={{
                                                        width: '100%'
                                                    }}
                                                    placeholder="Địa chỉ hiện tại"
                                                    size="small"
                                                    {...field}
                                                    error={!!error}
                                                    helperText={error?.message}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{ marginTop: '20px' }}>
                                    2. Thông tin đăng ký tiêm chủng
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Controller
                                            name="expected_date"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label="Ngày muốn được tiêm (dự kiến)"
                                                    variant="outlined"
                                                    size="small"
                                                    type="date"
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Controller
                                            name="session"
                                            control={control}
                                            render={({
                                                field,
                                                fieldState: { error }
                                            }) => (
                                                <FormControl
                                                    sx={{ width: '100%' }}>
                                                    <Select
                                                        defaultValue=""
                                                        sx={{
                                                            width: '100%'
                                                        }}
                                                        size="small"
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        {...field}
                                                        onChange={(event) => {
                                                            field.onChange(
                                                                event.target
                                                                    .value
                                                            );
                                                        }}>
                                                        <MenuItem
                                                            value={'Buổi sáng'}>
                                                            Buổi sáng
                                                        </MenuItem>
                                                        <MenuItem
                                                            value={
                                                                'Buổi chiều'
                                                            }>
                                                            Buổi chiều
                                                        </MenuItem>
                                                        <MenuItem
                                                            value={'Buổi tối'}>
                                                            Buổi tối
                                                        </MenuItem>
                                                        <MenuItem
                                                            value={'Cả ngày'}>
                                                            Cả ngày
                                                        </MenuItem>
                                                    </Select>
                                                    {error && (
                                                        <FormHelperText
                                                            sx={{
                                                                color: 'red'
                                                            }}>
                                                            {error?.message}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} mb={2}>
                                <Typography
                                    variant="body2"
                                    color="error"
                                    fontWeight={'bold'}
                                    mb={1}
                                    mt={2}>
                                    Lưu ý:
                                </Typography>
                                <Typography variant="body2" color="error">
                                    - Việc đăng ký thông tin hoàn toàn bảo mật
                                    và phục vụ cho chiến dịch tiêm chủng Vắc xin
                                    COVID - 19
                                </Typography>
                                <Typography variant="body2" color="error">
                                    - Xin vui lòng kiểm tra kỹ các thông tin bắt
                                    buộc (VD: Họ và tên, Ngày tháng năm sinh, Số
                                    điện thoại, Số CMND/CCCD/Mã định danh công
                                    dân/Hộ chiếu)
                                </Typography>
                                <Typography variant="body2" color="error">
                                    - Bằng việc nhấn nút "Xác nhận", bạn hoàn
                                    toàn hiểu và đồng ý chịu trách nhiệm với các
                                    thông tin đã cung cấp.
                                </Typography>
                                <Typography variant="body2" color="error">
                                    - Cá nhân/Tổ chức đăng ký thành công trên hệ
                                    thống sẽ được đưa vào danh sách đặt tiêm. Cơ
                                    sở y tế sẽ thông báo lịch tiêm khi có vắc
                                    xin và kế hoạch tiêm được phê duyệt. Trân
                                    trọng cảm ơn!
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                )}

                {activeStep === 1 && (
                    <Box sx={{ margin: 'auto', padding: 4 }}>
                        <Stack spacing={3}>
                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center">
                                <CheckCircleOutline
                                    color="primary"
                                    fontSize="large"
                                />
                                <Typography>
                                    1. Tiêm chủng vắc xin là biện pháp phòng
                                    chống dịch hiệu quả, tuy nhiên vắc xin phòng
                                    COVID-19 có thể không phòng được bệnh hoàn
                                    toàn. Người được tiêm chủng vắc xin phòng
                                    COVID-19 có thể phòng được bệnh hoặc giảm
                                    mức độ nặng nếu mắc bệnh. Tuy nhiên, sau khi
                                    tiêm chủng vẫn phải tiếp tục thực hiện các
                                    biện pháp phòng chống dịch theo quy định.
                                </Typography>
                            </Stack>

                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center">
                                <NewReleases
                                    color="secondary"
                                    fontSize="large"
                                />
                                <Typography>
                                    2. Tiêm chủng vắc xin phòng COVID-19 có thể
                                    gây ra một số biểu hiện tại chỗ tiêm hoặc
                                    toàn thân như sưng, đau chỗ tiêm, nhức đầu,
                                    buồn nôn, sốt, đau cơ... hoặc tai biến nặng
                                    sau tiêm chủng. Tiêm vắc xin mũi 2 do Pfizer
                                    sản xuất ở người đã tiêm mũi 1 bằng vắc xin
                                    AstraZeneca có thể tăng khả năng xảy ra phản
                                    ứng thông thường sau tiêm chủng.
                                </Typography>
                            </Stack>

                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center">
                                <LocalHospital color="info" fontSize="large" />
                                <Typography>
                                    3. Khi có triệu chứng bất thường về sức
                                    khỏe, người được tiêm chủng cần đến ngay cơ
                                    sở y tế gần nhất để được tư vấn, thăm khám
                                    và điều trị kịp thời.
                                </Typography>
                            </Stack>

                            <Stack
                                display={'flex'}
                                direction={'row'}
                                alignContent={'center'}
                                alignItems={'center'}>
                                <Typography>
                                    {'  '} Sau khi đọc các thông báo nêu trên,
                                    tôi đã hiểu về các nguy cơ và:
                                </Typography>

                                <FormControlLabel
                                    control={<Checkbox color="primary" />}
                                    label="Đồng ý tiêm chủng"
                                />
                            </Stack>
                        </Stack>
                    </Box>
                )}
                <Grid
                    xs={12}
                    sm={12}
                    md={12}
                    container
                    justifyContent={'center'}
                    mb={20}>
                    <Button
                        variant="outlined"
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}>
                        <ArrowBackIcon></ArrowBackIcon>Back
                    </Button>

                    {activeStep !== steps.length &&
                        (completed[activeStep] ? (
                            <Typography
                                variant="caption"
                                sx={{ display: 'inline-block' }}
                                justifyContent={'center'}
                                alignContent={'center'}
                                color={'error'}>
                                Step {activeStep + 1} already completed
                            </Typography>
                        ) : (
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{ borderBottomLeftRadius: 0 }}
                                onClick={handleCheckValues}>
                                <ArrowBackIcon></ArrowBackIcon>
                                {completedSteps() === totalSteps() - 1
                                    ? 'Finish'
                                    : 'Tiếp tục'}
                            </Button>
                        ))}
                </Grid>
            </Box>
        </Grid>
    );
}

export default Content;
