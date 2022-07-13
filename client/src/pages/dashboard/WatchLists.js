import React, { useContext, useState, useEffect } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Person from '@mui/icons-material/Person';
import GroupAdd from '@mui/icons-material/GroupAdd';
import Grid from '@mui/material/Grid';
import Add from '@mui/icons-material/Add';
import Graph from '@mui/icons-material/Timeline';
import Remove from '@mui/icons-material/Remove';
import Loading from '../../components/Loading';
import CardActions from '@mui/material/CardActions';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

export default function WatchLists() {
    const { currentUser } = useAuth();
    const [groupData, setGroupData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getGroups();
    }, []);

    async function getGroups() {
        await axios.get('/groups/all').then((res) => {
            setGroupData(res.data.groups);
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
        });
    }

    function createGroup(group) {
        const isMember = group.memberUsernames.includes(currentUser.username);
        return (
            <Card key={group.name} sx={{ mb: 3, maxWidth: 500 }} align="left">
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {group.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {group.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    {isMember ?
                        <>
                            <Button variant="outlined" color="primary" component={RouterLink} to={`groups/view/${group.name}`} startIcon={<Graph />} sx={{ mr: 1 }}>View</Button>
                            <Button variant="outlined" color="error" startIcon={<Remove />}>Leave</Button>
                        </>
                        : <Button variant="outlined" color="primary" startIcon={<Add />}>Join</Button>
                    }
                </CardActions>
            </Card >
        )
    }

    return (
        isLoading ? <Loading /> :
            <div align="center">
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

                    {groupData.map((group) => {
                        return createGroup(group)
                    })}
                </div>
            </div>
    )
}
