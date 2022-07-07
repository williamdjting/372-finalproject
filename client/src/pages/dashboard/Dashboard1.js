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
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
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
            
            <div class="inner1">
                <Box  component="form" noValidate autoComplete="off">
                            <FormControl sx={{ width: '25ch' }}>
                            <OutlinedInput placeholder="Please enter text" />
                        </FormControl>
                </Box>

            </div>
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
            
            
            <Table  sx={{ minWidth: 400, maxWidth: 1200}} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell><b>Your Stocks</b></TableCell>
                <TableCell align="right"><b>Share Price</b></TableCell>
                <TableCell align="right"><b>Number of Shares</b></TableCell>
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
                    <TableCell align="right">
                        <Stack spacing={0} direction="row">
                            <Button variant="contained" onClick={() => {
                            }}>Remove</Button>
                        </Stack>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
      </div>
    );
  }



export default Dashboard1;