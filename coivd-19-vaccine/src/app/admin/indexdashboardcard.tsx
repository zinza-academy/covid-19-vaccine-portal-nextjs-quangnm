import React from 'react';
import { Grid, Container } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BugReportIcon from '@mui/icons-material/BugReport';
import DashboardCard from './dashboardcard';
import MedicationIcon from '@mui/icons-material/Medication';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import AddTaskIcon from '@mui/icons-material/AddTask';

const DashboardPage: React.FC = () => {
  return (
    <Container style={{ marginTop: '50px' }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard icon={<VaccinesIcon style={{ fontSize: 50, color: 'green' }} />} count="714k" label="Vaccin" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard icon={<PeopleIcon style={{ fontSize: 50, color: 'blue' }} />} count="1.35m" label="New Users" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard icon={<AddTaskIcon style={{ fontSize: 50, color: 'orange' }} />} count="1.72m" label="Item request" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
