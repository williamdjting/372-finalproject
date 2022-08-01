import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Person from '@mui/icons-material/Person';
import GroupAdd from '@mui/icons-material/GroupAdd';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
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
        setIsLoading(true);
        await axios.get('/groups/all').then((res) => {
            setGroupData(res.data.groups);
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
        });
    }

    async function joinGroup(name) {
        const res = await axios.post('/groups/join', {
            name: name,
        });

        if (res.data.success)
            getGroups();
    }

    async function leaveGroup(name) {
        const res = await axios.post('/groups/leave', {
            name: name,
        });

        if (res.data.success)
            getGroups();
    }

    async function deleteGroup(name) {
        const res = await axios.post('/groups/delete', {
            name: name,
        });

        if (res.data.success)
            getGroups();
    }

    function createGroup(group) {
        const isMember = group.members.includes(currentUser.username);
        const isAdmin = group.admin === currentUser.username;
        return (
            <Card key={group.name} sx={{ mb: 3 }} align="left">
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
                            <Button variant="outlined" color="error" startIcon={<Remove />} onClick={() => { leaveGroup(group.name) }}>Leave</Button>
                        </>
                        : <Button variant="outlined" color="primary" startIcon={<Add />} onClick={() => { joinGroup(group.name) }}>Join</Button>
                    }
                    {isAdmin ? <Button variant="outlined" color="error" startIcon={<Delete />} onClick={() => { deleteGroup(group.name) }}>Delete</Button>
                        : <></>}
                </CardActions>
            </Card >
        )
    }

    return (
        isLoading ? <Loading /> :
            <div>
                <div>
                    <Typography component="h1" variant="h2" color="textPrimary" sx={{ mb: 1 }}>Personal WatchList</Typography>
                    <Link underline='none' component={RouterLink} to={"/dashboard/personal"}>
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
