import React, { useState, useEffect, useRef } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loading from "../../components/Loading";

function stockModel(name) {
    return { name }
}

function memberModel(name) {
    return { name }
}

export default function GroupWatchListView() {
    const { currentUser } = useAuth();
    const [group, setGroup] = useState();
    const [isAdmin, setIsAdmin] = useState();
    const [memberData, setMemberData] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = new useNavigate();
    const { name } = useParams();
    const stockTickerRef = useRef();

    useEffect(() => {
        getGroup();
    }, []);

    async function getGroup() {
        await axios.get('/groups/get', {
            params: { name: name }
        }).then((res) => {
            setGroup(res.data.group);

            if (res.data.group) {
                setIsAdmin(res.data.group.admin === currentUser.username);
                const members = [];
                res.data.group.members.forEach((member) => members.push(memberModel(member)));
                setMemberData(members);

                const stocks = [];
                res.data.group.stockList.forEach((stock) => stocks.push(stockModel(stock)));
                setStockData(stocks);
            }

            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
            navigate('/dashboard');
        });

        stockTickerRef.current.value = "";
    }

    async function kickMember(groupName, member) {
        const res = await axios.post('/groups/kick', {
            name: groupName,
            kickedMember: member
        });

        if (res.data.success)
            await getGroup();
    }

    async function addStock(groupName, stock) {
        const res = await axios.post('/groups/addstock', {
            name: groupName,
            stock: stock
        });

        if (res.data.success)
            await getGroup();
    }

    async function removeStock(groupName, stock) {
        const res = await axios.post('/groups/removestock', {
            name: groupName,
            stock: stock
        });

        if (res.data.success)
            await getGroup();
    }

    function stockManager() {
        return <>
            <Card sx={{ mb: 1 }}>
                <CardContent>
                    <Box display="flex">
                        <TextField id="outlined-basic" label="Stock Ticker" variant="outlined" inputRef={stockTickerRef} />
                        <Button variant="contained" sx={{ mx: 1, py: 2 }} onClick={() => { addStock(group.name, stockTickerRef.current.value) }} startIcon={<Add />}>Add</Button>
                    </Box>
                    <TableContainer align="right">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left"><b>Stocks</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stockData.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button variant="outlined" color="error" onClick={() => { removeStock(group.name, row.name); }} startIcon={<Delete />}>Remove</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </>
    }

    function adminPanel() {
        return <>
            <Typography component="h1" variant="h2" color="textPrimary" sx={{ mb: 1 }}>Admin Panel</Typography>
            {stockManager()}
        </>
    }

    return (
        isLoading ? <Loading /> : <div>
            <Typography component="h1" variant="h2" color="textPrimary" sx={{ mb: 1 }}>{name}</Typography>
            <TableContainer component={Paper} sx={{ mb: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"><b>Stocks</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stockData.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" component="th" scope="row">
                                    {row.name}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <TableContainer align="right">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left"><b>{group.name}</b></TableCell>
                                    <TableCell align="right"><b>Kick Member</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {memberData.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{row.name}</TableCell>
                                        <TableCell align="right">
                                            {isAdmin && row.name !== currentUser.username ? <Button variant="outlined" color="error" onClick={() => { kickMember(group.name, row.name) }} startIcon={<Delete />}>KICK</Button> : <></>}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {isAdmin ? adminPanel() : <></>}
        </div>
    )
}
