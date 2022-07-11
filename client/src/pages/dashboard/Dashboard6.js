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
import Box from '@mui/material/Box';


// import FormControl, { useFormControl } from '@mui/material/FormControl';
// import OutlinedInput from '@mui/material/OutlinedInput';

import '../../stylesheets/Dashboard6.css'



  
const rows1 = [
    {name: 'Tech Stocks'},{name: 'Value Stocks'},

];

const rows2 = [
    {name: 'Default Watchlist'}

];



function Dashboard6() {
    return (
        <div>
            <table align="center">
                <br></br>
            <h1 align="center">Change Your Watchlists</h1>
            <br></br>
            <tr class='row6'>
                    <td class='col6'>

                    <div >
                         <TableContainer  align="right" component={Paper}>
                        
                        
                        <Table  sx={{ minWidth: 750, maxWidth: 1200}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            {/* <TableCell align="left"><b></b></TableCell> */}
                            <TableCell align="left"><b>Personal Watchlist</b></TableCell>
                            <TableCell align="right"><b>Change Watchlist</b></TableCell>
                            <TableCell align="right"><b>Delete Watchlist</b></TableCell>
                            

                            </TableRow>
                        </TableHead>
                        {/* //fetch API right here inside <tablebody> and render the hook here// */}
                        <TableBody>

                            
                            {rows2.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell align="left" component="th" scope="row">
                                Default Watchlist
                                </TableCell>
                                <TableCell align="right">
                        <div>
                            <Button size="small" variant="contained" href="/dashboard8" >Change</Button>
                        {/* </Stack> */}
                        </div>    
                                </TableCell>
                                <TableCell align="right">
                        <div>
                            
                        </div>    
                                </TableCell>

                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>


                        </div>
                    </td>

                    
                <br></br>

                </tr>

                <tr>
                <td class='col6'>

                    <div >
                    <TableContainer  align="right" component={Paper}>
                    
                    
                    <Table  sx={{ minWidth: 750, maxWidth: 1200}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        {/* <TableCell align="left"><b></b></TableCell> */}
                        <TableCell align="left"><b>Group Watchlists</b></TableCell>
                        <TableCell align="right"><b>Change Watchlist</b></TableCell>
                        <TableCell align="right"><b>Delete Watchlist</b></TableCell>
                        

                        </TableRow>
                    </TableHead>
                    {/* //fetch API right here inside <tablebody> and render the hook here// */}
                    <TableBody>

                        
                        {rows1.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >

                            <TableCell align="left" component="th" scope="row">
                            {row.name}
                            </TableCell>
                            <TableCell align="right">
                    <div>
                        <Button size="small" variant="contained" href="/dashboard7">Change</Button>
                    {/* </Stack> */}
                    </div>    
                            </TableCell>
                            <TableCell align="right">
                    <div>
                        <Button size="small" variant="contained">Delete</Button>
                    {/* </Stack> */}
                    </div>    
                            </TableCell>

                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>


                    </div>
                </td>

                </tr>

            </table>







        </div>
    )
}

export default Dashboard6;