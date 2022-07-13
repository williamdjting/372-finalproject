import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Person from '@mui/icons-material/Person';
import GroupAdd from '@mui/icons-material/GroupAdd';
import Grid from '@mui/material/Grid';
import Add from '@mui/icons-material/Add';
import { CardActionArea } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

export default function WatchLists() {
    function createJoinableGroup(name, description) {
        return (
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container alignItems="center">
                        <Grid item xs={10}>
                            <Typography gutterBottom variant="h6" component="div">
                                {name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {description}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} align="center">
                            <Button variant="contained" color="primary" startIcon={<Add />}>Join</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card >
        )
    }

    function createGroup(name, description, route) {
        return (
            <Card sx={{ mb: 3 }}>
                <Link underline='none' component={RouterLink} to={route}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        )
    }

    return (
        <div>
            <div>
                <Typography component="h1" variant="h2" color="textPrimary" sx={{ mb: 1 }}>Personal WatchList</Typography>
                <Link underline='none' component={RouterLink} to={"/dashboard2"}>
                    <Button variant="contained" color="primary" startIcon={<Person />}>View Personal WatchList</Button>
                </Link>
            </div>
            <br />

            <div>
                <Typography component="h1" variant="h2" color="textPrimary" sx={{ mb: 1 }}>Group WatchLists</Typography>
                <Link underline='none' component={RouterLink} to={"/dashboard/groups/register"}>
                    <Button variant="contained" color="primary" sx={{ mb: 1 }} startIcon={<GroupAdd />}>Register New Group</Button>
                </Link>

                {createGroup("Tech Stocks", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", "/dashboard/groups/view/TechStocks")}
                {createGroup("Crypto Bros", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", "/dashboard/groups/view/TechStocks")}
            </div>

            <div>
                <Typography component="h1" variant="h2" color="textPrimary" sx={{ mb: 1 }}>Public WatchLists</Typography>
                {createJoinableGroup("Tech Stocks 2", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", "/dashboard/groups/view/TechStocks")}
            </div>
        </div>
    )
}
