import { Box, Grid } from '@mui/material';
import Header from '../homepage/header'
import User from '../admin/user/view/user'
export default async function Home() {
    console.log('serverside rendering');
    return (
        <main className="w-full h-screen grid md:grid-cols-2 place-items-center">
            <Header></Header>
            <User></User>
        </main>
    );
}
