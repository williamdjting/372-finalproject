import React, { useState, useEffect } from "react";
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
import Loading from "../../components/Loading";

function stockModel(name, price, revenue, revenueGrowth, psRatio, grossProfit, ebitda, peRatio) {
    return { name, price, revenue, revenueGrowth, psRatio, grossProfit, ebitda, peRatio }
}

const stockData = [
    stockModel('Shopify', 35.57, 4600000000, 57, 28, 0.94, 335000000, 28.23)
];

function memberModel(name) {
    return { name }
}

const memberData = [
    memberModel("Matt")
]

export default function GroupWatchListView() {
    const [group, setGroup] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = new useNavigate();
    const { name } = useParams();
    const isAdmin = true;

    useEffect(() => {
        getGroup();
    }, []);

    async function getGroup() {
        await axios.get('/groups/get', {
            params: { name: name }
        }).then((res) => {
            setGroup(res.data.group);
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
            navigate('/dashboard');
        });
    }

    function memberManager() {
        return <>
            <Card>
                <CardContent>
                    <TableContainer align="right">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left"><b>{group.name}</b></TableCell>
                                    <TableCell align="right"><b>Remove Member</b></TableCell>
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
                                            <Button variant="outlined" color="error" onClick={() => { }} startIcon={<Delete />}>Remove</Button>
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

    function stockManager() {
        return <>
            <Card sx={{ mb: 1 }}>
                <CardContent>
                    <Box display="flex">
                        <TextField id="outlined-basic" label="Stock Ticker" variant="outlined" />
                        <Button variant="contained" sx={{ mx: 1, py: 2 }} onClick={() => { }} startIcon={<Add />}>Add</Button>
                    </Box>
                    <TableContainer align="right">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left"><b>Your Stocks</b></TableCell>
                                    <TableCell align="right"><b>Share Price</b></TableCell>
                                    <TableCell align="right"><b>Number of Shares</b></TableCell>
                                    <TableCell align="right"><b>Total</b></TableCell>
                                    <TableCell align="right"><b>Remove Stock</b></TableCell>
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
                                        <TableCell align="right">{row.price}</TableCell>
                                        <TableCell align="right">{row.amount}</TableCell>
                                        <TableCell align="right">{row.total}</TableCell>
                                        <TableCell align="right">
                                            <Button variant="outlined" color="error" onClick={() => { }} startIcon={<Delete />}>Remove</Button>
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
            {memberManager()}
        </>
    }

    return (
        isLoading ? <Loading /> : <div>
            <Typography component="h1" variant="h2" color="textPrimary" sx={{ mb: 1 }}>{name}</Typography>
            <TableContainer component={Paper} sx={{ mb: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"><b>Your Stocks</b></TableCell>
                            <TableCell align="right"><b>Share Price (USD)</b></TableCell>
                            <TableCell align="right"><b>Revenue (TTM)</b></TableCell>
                            <TableCell align="right"><b>Revenue Growth (TTM)</b></TableCell>
                            <TableCell align="right"><b>PS Ratio</b></TableCell>
                            <TableCell align="right"><b>Gross Profit (USD)</b></TableCell>
                            <TableCell align="right"><b>EBITDA (USD)</b></TableCell>
                            <TableCell align="right"><b>PE Ratio</b></TableCell>
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
                                <TableCell align="right">${row.price}</TableCell>
                                <TableCell align="right">${row.revenue}</TableCell>
                                <TableCell align="right">{row.revenueGrowth}%</TableCell>
                                <TableCell align="right">{row.psRatio}</TableCell>
                                <TableCell align="right">${row.grossProfit}</TableCell>
                                <TableCell align="right">${row.ebitda}</TableCell>
                                <TableCell align="right">${row.peRatio}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {isAdmin ? adminPanel() : <></>}
        </div>
    )
}
