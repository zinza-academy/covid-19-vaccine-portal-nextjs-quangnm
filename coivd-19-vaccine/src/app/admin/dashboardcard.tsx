import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';

interface DashboardCardProps {
    icon: React.ReactNode;
    count: string;
    label: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, count, label }) => {
    return (
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', borderRadius: '15px' }}>
            <Grid container display={'flex'} justifyContent={'center'} alignItems="center" gap={2}>
                <Grid item>{icon}</Grid>
                <Grid item py={3}>
                    <Grid item>
                        <Typography variant="h4" component="div">
                            {count}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" color="textSecondary">
                            {label}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default DashboardCard;
