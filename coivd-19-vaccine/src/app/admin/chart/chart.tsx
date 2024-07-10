'use client'
import { Grid, Paper, Typography } from '@mui/material';
import dynamic from 'next/dynamic';

const LineChart = dynamic(() => import('./line_chart'), { ssr: false });
const PieChart = dynamic(() => import('./piechart'), { ssr: false });

const Dashboard = () => {
  return (
    <Grid container spacing={3} style={{ padding: 24 }}>
      <Grid item xs={12} md={8}>
        <Paper style={{ padding: 24 }}>
          <Typography variant="h6"><b>Website Visits</b></Typography>
          <Typography variant="body2" color="textSecondary">(+43%) than last day</Typography>
          <LineChart />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}> 
        <Paper style={{ padding: 24 }} >
          <Typography variant="h6" mb={7}><b>Current Visits</b></Typography>
          <PieChart />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
