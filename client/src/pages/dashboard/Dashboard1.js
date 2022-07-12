import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import '../../stylesheets/Dashboard1.css'

function createData(name, price, amount, total) {
    return { name, price, amount, total };
  }
  
const rows = [
    createData('Apple', 120, 5.0, 600),
    createData('Google', 2000, 1, 2000),
    createData('Amazon', 130, 5, 650),
];

function Dashboard1() {
    return (
      <div>
        <br></br>
        <h1 id="createyourpersonalwatchlist1">Create your personal watchlist</h1>
        <br></br>
        <div id="outer1">
            <form class="inner1" >
                <input id="inputboxsize1" type="text" maxlength="4" placeholder="Enter stock ticker"></input>
            </form>
            <br></br>
            <br></br>
            <div class="inner1">
        <Stack  spacing={0} direction="row">
             <Button variant="contained" onClick={() => {}}>Add
             </Button>
        </Stack>
            </div>
        </div>
        <br></br>
        <br></br>
        <TableContainer align="right" component={Paper}>
            <Table  sx={{ minWidth: 400, maxWidth: 2400}} aria-label="simple table">
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
                    <TableCell align="left" component="th" scope="row">
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
        <br></br>
        <br></br>
        <div id="outer4bottom">
            <div class="inner4">
                <Stack spacing={0} direction="row">
                    <Button align="center" variant="contained" onClick={() => {
                    }}>Confirm</Button>
                </Stack>
            </div>
        </div>
        <br></br>
        <br></br>
      </div>
    );
  }


export default Dashboard1;