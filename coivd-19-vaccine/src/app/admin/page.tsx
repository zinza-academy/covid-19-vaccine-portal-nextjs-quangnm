import { Box, Grid } from '@mui/material';
import Header from '../homepage/header'
import User from './user/user'
import Chart from './chart/chart'
import DashboardCard from './indexdashboardcard'
import Footer from '../homepage/footer'

export default async function Home() {
    console.log('serverside rendering');
    return (
        <main className="w-full h-screen grid md:grid-cols-2 place-items-center gy-3">
            <Header></Header>
            <DashboardCard></DashboardCard>
            <Chart></Chart>
            <User></User>
            <Footer></Footer>
        </main>
    );
}
