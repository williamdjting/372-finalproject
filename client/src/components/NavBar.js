import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

export default function NavBar() {
    return (
        <Container maxWidth="lg" sx={{ my: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h4" sx={{ flexGrow: 1 }}>
                            Group Stock
                        </Typography>
                        <Button color="inherit">Insights</Button>
                        <Button color="inherit">WatchLists</Button>
                        <Button color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </Container>
    );
};
