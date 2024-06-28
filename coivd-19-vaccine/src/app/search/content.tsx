'use client'
import * as React from 'react';
import { Grid, Typography, Stepper, Step, StepButton, Button, Box, StepLabel, TextField, MenuItem, Stack, FormControlLabel, Checkbox } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CheckCircleOutline, LocalHospital, NewReleases } from '@mui/icons-material';

const steps = ['Thông tin cá nhân', 'Phiếu đồng ý tiêm', 'Hoàn thành'];
function Content() {

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean;
    }>({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };


    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const priorities = [
        { value: 'high', label: 'Nhóm ưu tiên' },
    ];

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ?
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    return (
        <Grid container>
            <Grid item mt={5} mb={5} bgcolor={'#eeeeee'} pt={1} pb={1} width={'100%'} display={'flex'} justifyContent={'center'}>
                <Typography variant="h6" width={'94%'}>
                    Tra cứu đăng ký tiêm
                </Typography>
            </Grid>

            <Box sx={{ width: '100%' }}>
                <Stepper nonLinear activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton color="inherit" onClick={handleStep(index)}>
                                <StepLabel>{label}</StepLabel>
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>

                {activeStep === 0 &&
                    <Grid container justifyContent={'center'} mt={4}>
                        <Grid width={'92%'}>
                            <Grid container sx={{ rowGap: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    1. Thông tin người đăng ký tiêm
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Nhóm ưu tiên"
                                            variant="outlined"
                                            required
                                        >
                                            {priorities.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            fullWidth
                                            label="Số thẻ BHYT"
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            fullWidth
                                            label="Nghề nghiệp"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            fullWidth
                                            label="Đơn vị công tác"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            fullWidth
                                            label="Địa chỉ hiện tại"
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>

                                <Typography variant="h6" gutterBottom sx={{ marginTop: '20px' }}>
                                    2. Thông tin đăng ký tiêm chủng
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            fullWidth
                                            label="Ngày muốn được tiêm (dự kiến)"
                                            variant="outlined"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            fullWidth
                                            label="Buổi tiêm mong muốn"
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} mb={2}>
                                <Typography variant="body2" color="error" fontWeight={'bold'} mb={1} mt={2}>
                                    Lưu ý:
                                </Typography>
                                <Typography variant="body2" color="error">
                                    - Việc đăng ký thông tin hoàn toàn bảo mật và phục vụ cho chiến dịch tiêm chủng Vắc xin COVID - 19
                                </Typography>
                                <Typography variant="body2" color="error">
                                    - Xin vui lòng kiểm tra kỹ các thông tin bắt buộc (VD: Họ và tên, Ngày tháng năm sinh, Số điện thoại, Số CMND/CCCD/Mã định danh công dân/Hộ chiếu)
                                </Typography>
                                <Typography variant="body2" color="error">
                                    - Bằng việc nhấn nút "Xác nhận", bạn hoàn toàn hiểu và đồng ý chịu trách nhiệm với các thông tin đã cung cấp.
                                </Typography>
                                <Typography variant="body2" color="error">
                                    - Cá nhân/Tổ chức đăng ký thành công trên hệ thống sẽ được đưa vào danh sách đặt tiêm. Cơ sở y tế sẽ thông báo lịch tiêm khi có vắc xin và kế hoạch tiêm được phê duyệt. Trân trọng cảm ơn!
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                }

                {activeStep === 1 &&
                    <Box sx={{ margin: 'auto', padding: 4 }}>
                        <Stack spacing={3}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <CheckCircleOutline color="primary" fontSize="large" />
                                <Typography>
                                    1. Tiêm chủng vắc xin là biện pháp phòng chống dịch hiệu quả, tuy nhiên vắc xin phòng COVID-19 có thể
                                    không phòng được bệnh hoàn toàn. Người được tiêm chủng vắc xin phòng COVID-19 có thể phòng được bệnh hoặc
                                    giảm mức độ nặng nếu mắc bệnh. Tuy nhiên, sau khi tiêm chủng vẫn phải tiếp tục thực hiện các biện pháp
                                    phòng chống dịch theo quy định.
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={2} alignItems="center">
                                <NewReleases color="secondary" fontSize="large" />
                                <Typography>
                                    2. Tiêm chủng vắc xin phòng COVID-19 có thể gây ra một số biểu hiện tại chỗ tiêm hoặc toàn thân như sưng,
                                    đau chỗ tiêm, nhức đầu, buồn nôn, sốt, đau cơ... hoặc tai biến nặng sau tiêm chủng. Tiêm vắc xin mũi 2 do
                                    Pfizer sản xuất ở người đã tiêm mũi 1 bằng vắc xin AstraZeneca có thể tăng khả năng xảy ra phản ứng thông
                                    thường sau tiêm chủng.
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={2} alignItems="center">
                                <LocalHospital color="info" fontSize="large" />
                                <Typography>
                                    3. Khi có triệu chứng bất thường về sức khỏe, người được tiêm chủng cần đến ngay cơ sở y tế gần nhất để
                                    được tư vấn, thăm khám và điều trị kịp thời.
                                </Typography>
                            </Stack>

                            <Stack display={'flex'} direction={'row'} alignContent={'center'} alignItems={'center'}>
                                <Typography>
                                    {'  '} Sau khi đọc các thông báo nêu trên, tôi đã hiểu về các nguy cơ và:
                                </Typography>

                                <FormControlLabel
                                    control={<Checkbox color="primary" />}
                                    label="Đồng ý tiêm chủng"
                                />
                            </Stack>
                        </Stack>
                    </Box>
                }
                <Grid xs={12} sm={12} md={12} container justifyContent={'center'} mb={20}>
                    <Button
                        variant="outlined"
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack} 
                        sx={{ mr: 1 }}
                    >
                        <ArrowBackIcon></ArrowBackIcon>Back
                    </Button>

                    {activeStep !== steps.length &&
                        (completed[activeStep] ? (
                            <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                Step {activeStep + 1} already completed
                            </Typography>
                        ) : (
                            <Button variant='contained' onClick={handleComplete} sx={{ borderBottomLeftRadius: 0 }}>
                                <ArrowBackIcon></ArrowBackIcon>
                                {completedSteps() === totalSteps() - 1
                                    ? 'Finish'
                                    : 'Tiếp tục'}
                            </Button>
                        ))
                    }
                </Grid>
            </Box>
        </Grid>
    )
}

export default Content