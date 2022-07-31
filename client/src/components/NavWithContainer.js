import React from 'react';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';
import { Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function NavBar(props) {
    const navigate = new useNavigate();
    const { logout } = useAuth();

    function navItems() {
        return <>
            <Button color="inherit" onClick={() => { navigate("/dashboard/insights"); }}>Insights</Button>
            <Button color="inherit" onClick={() => { logout(); navigate("/"); }}>Logout</Button>
        </>
    }

    return (
        <Container maxWidth="lg" sx={{ my: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            component={RouterLink} to={props.hidden ? "/" : "/dashboard"}
                        >
                            <HomeIcon />
                        </IconButton>
                        <Typography variant="h4" sx={{ flexGrow: 1 }}>
                            GroupStock
                        </Typography>
                        {props.hidden ? <></> : navItems()}
                    </Toolbar>
                </AppBar>
            </Box>
        </Container>
    );
};

export default function NavWithContainer(props) {
    return (
        <>
            <NavBar hidden={props.hidden} />
            <Container maxWidth="lg" sx={{ my: 3 }}>
                <Outlet />
            </Container>
        </>
    );
};
