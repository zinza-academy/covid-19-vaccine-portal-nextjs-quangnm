'use client'

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Grid, Box } from '@mui/material';
import LineChart from './component/linechart';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flexGrow: 1,
    padding: theme.spacing(4),
    borderRadius: 0
}));

function Content() {

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
        { date: '12/7', quantity: 92 },
    ];


    return (
        <Grid container display={'flex'} justifyContent={'center'} alignContent={'center'} alignItems={'center'} mt={5}>
            <Stack
                direction="row"
                sx={{
                    border: 0,
                    width: '100%'
                }}
            >
                <Item>Item 1</Item>
                <Item>Item 2</Item>
                <Item>Item 3</Item>
            </Stack>


            <Grid item xs={12} display="flex" justifyContent="center" mt={5}>
                <Box boxShadow={4} borderRadius={2} p={3} bgcolor="background.paper" width={'100%'}>
                    <LineChart data={data} />
                </Box>
            </Grid>
        </Grid>
    );
}

export default Content;
