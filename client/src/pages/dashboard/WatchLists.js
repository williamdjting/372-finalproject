import React, { useContext, useState, useEffect } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Person from '@mui/icons-material/Person';
import GroupAdd from '@mui/icons-material/GroupAdd';
import Grid from '@mui/material/Grid';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import Loading from '../../components/Loading';
import { CardActionArea } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

export default function WatchLists() {
    const { currentUser } = useAuth();
    const [groupData, setGroupData] = useState([]);
    const [joinedGroupData, setJoinedGroupData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getGroups();
    }, []);

    async function getGroups() {
        await axios.get('/groups/all').then((res) => {
            setGroupData(res.data.groups);
            setJoinedGroupData(res.data.groups.filter((group) => group.memberUsernames.includes(currentUser.username)));
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
        });
    }

    function createJoinableGroup(name, description, isMember) {
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
                            {isMember ? <Button variant="contained" color="primary" startIcon={<Remove />}>Leave</Button>
                                : <Button variant="contained" color="primary" startIcon={<Add />}>Join</Button>
                            }
                        </Grid>
                    </Grid>
                </CardContent>
            </Card >
        )
    }

    function createGroup(name, description, route) {
        return (
            <Card key={name} sx={{ mb: 3 }}>
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
        isLoading ? <Loading /> : <div>
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

                {joinedGroupData.map((group) => {
                    return createGroup(group.name, group.description, `/dashboard/groups/view/${group.name}`)
                })}
            </div>

            <div>
                <Typography component="h1" variant="h2" color="textPrimary" sx={{ mb: 1 }}>Public WatchLists</Typography>
                {groupData.map((group) => {
                    return createJoinableGroup(group.name, group.description, joinedGroupData.includes(group))
                })}
            </div>
        </div>
    )
}
