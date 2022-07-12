import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Card, CardContent, TextField } from '@mui/material';

function createData(name, price, amount, total) {
    return { name, price, amount, total };
}

const rows = [
    createData('Apple', 120, 5.0, 600),
    createData('Google', 2000, 1, 2000),
    createData('Amazon', 130, 5, 650),
];

export default function GroupWatchListAddStocks() {
    return (
        <Card sx={{ mx: 5, my: 3 }}>
            <CardContent>
                <h1>Add Stocks</h1>
                {/* <div class="inner8">
                <Box  component="form" noValidate autoComplete="off">
                            <FormControl sx={{ width: '25ch' }}>
                            <OutlinedInput maxlength="4" placeholder="Please enter stock ticker" />
                            
                        </FormControl>
                </Box>

            </div> */}
                <Box display="flex" alignItems="center" >
                    <TextField id="outlined-basic" label="Stock Ticker" variant="outlined" />
                    <Button variant="contained" sx={{ mx: 1, py: 2 }} onClick={() => { }}>Add</Button>
                </Box>
                <TableContainer align="right">
                    <Table sx={{ minWidth: 400, maxWidth: 2400 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {/* <TableCell align="left"><b></b></TableCell> */}
                                <TableCell align="left"><b>Your Stocks</b></TableCell>
                                <TableCell align="right"><b>Share Price</b></TableCell>
                                <TableCell align="right"><b>Number of Shares</b></TableCell>
                                <TableCell align="right"><b>Total</b></TableCell>
                                <TableCell align="right"><b>Remove Stock</b></TableCell>
                            </TableRow>
                        </TableHead>
                        {/* //fetch API right here inside <tablebody> and render the hook here// */}
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
                                        {/* <Stack spacing={0} direction="row">
                            <Button variant="contained" onClick={() => {
                            }}>Remove</Button>
                        </Stack> */}
                                        <Button variant="contained" onClick={() => {
                                        }}>Remove</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant="contained" onClick={() => { }}>Confirm</Button>
            </CardContent>
        </Card>
    );
}
