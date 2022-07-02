import React from 'react';
import NavBar from './NavBar';
import { Outlet } from 'react-router';

export default () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
};