import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
        <h2 align="left">Create your personal watchlist</h2>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell><b>Your Watchlist</b></TableCell>
                <TableCell align="right"><b>Stock Name</b></TableCell>
                <TableCell align="right"><b>Share Price</b></TableCell>
                <TableCell align="right"><b>Total</b></TableCell>

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
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
      </div>
    );
  }



export default Dashboard1;