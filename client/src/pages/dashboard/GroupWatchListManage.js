import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Card, CardContent, TextField } from '@mui/material';

function createData(name, price, amount, total) {
    return { name, price, amount, total };
}

const rows = [
    createData('Apple', 120, 5.0, 600),
    createData('Google', 2000, 1, 2000),
    createData('Amazon', 130, 5, 650),
];

export default function GroupWatchListManage() {
    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    Group Name
                </Typography>
                <Box display="flex" alignItems="center" >
                    <TextField id="outlined-basic" label="Stock Ticker" variant="outlined" />
                    <Button variant="contained" sx={{ mx: 1, py: 2 }} onClick={() => { }}>Add</Button>
                </Box>
                <TableContainer align="right">
                    <Table sx={{ minWidth: 400, maxWidth: 2400 }} aria-label="simple table">
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

                            {rows.map((row) => (
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
                                        <Button variant="contained" onClick={() => {
                                        }}>Remove</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}
