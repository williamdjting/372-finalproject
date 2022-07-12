import React from 'react';
import Container from '@mui/material/Container';
import NavBar from './NavBar';
import { Outlet } from 'react-router';

export default () => {
    return (
        <>
            <NavBar />
            <Container maxWidth="lg" sx={{ my: 3 }}>
                <Outlet />
            </Container>
        </>
    );
};