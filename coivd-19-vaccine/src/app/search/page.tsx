import { Box, Grid } from '@mui/material';
import Homepage from '../homepage/header';
import Footer from '../homepage/footer';
import Content from './content';

export default async function Home() {
  console.log('serverside rendering');
  return (
    <main className="w-full h-screen grid md:grid-cols-2 place-items-center">
      <Homepage></Homepage>
      <Grid container justifyContent={'center'}>
        {/* <Grid sx={{ width: '96%' }}> */}
        <Content></Content>
        {/* </Grid> */}
      </Grid>
      <Footer></Footer>
    </main>
  );
}
