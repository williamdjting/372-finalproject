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

import '../../stylesheets/Dashboard9.css'

function createData1(name, price, revenue, revenueGrowth, psRatio, grossProfit, ebitda, peRatio ) {
    return { name, price, revenue, revenueGrowth, psRatio, grossProfit, ebitda, peRatio
  }
}
  
const rows1 = [
    createData1('Shopify', 35.57, 4600000000,57,28, 0.94,335000000,28.23),

];


function createData2(groupName, groupLink ) {
    return { groupName, groupLink};
  }
  
const rows2 = [
    createData2('Tech Stocks', '/groups/techstocks' ),
    createData2('Value Stocks', '/groups/valuestocks' ),

];



function Dashboard9() {
    return (
        <div>
            <br></br>
            <h1 align="center">Your Insights</h1>

            <br></br>

            <h2 align="center">[sorting tab, react hook goes here]</h2>

            <br></br>

            <table align="center">
                <br></br>
            

                <tr class='row9'>
                    <td class='col9'>

                    <div >
                         <TableContainer  align="right" component={Paper}>
                        
                        
                        <Table  sx={{ minWidth: 150, maxWidth: 1200}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            {/* <TableCell align="left"><b></b></TableCell> */}
                            <TableCell align="left"><b>Insight 1</b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
                            

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
                                <TableCell align="right">${row.price}</TableCell>
                                <TableCell align="right">${row.revenue}</TableCell>

                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>


                        </div>
                    </td>

                    <td class='col9'>
                    <TableContainer  align="right" component={Paper}>
                        
                        
                        <Table  sx={{ minWidth: 150, maxWidth: 1200}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            {/* <TableCell align="left"><b></b></TableCell> */}
                            <TableCell align="left"><b>Insight 2</b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
                            <TableCell align="right"><b></b></TableCell>


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
                                <TableCell align="right">${row.price}</TableCell>
                                <TableCell align="right">${row.revenue}</TableCell>

                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                        
                    </td>

                    <td class='col9'>
                    <TableContainer  align="right" component={Paper}>
                        
                        
                        <Table  sx={{ minWidth: 150, maxWidth: 1200}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            {/* <TableCell align="left"><b></b></TableCell> */}
                            <TableCell align="left"><b>Insight 3</b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
                            <TableCell align="right"><b></b></TableCell>

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
                                <TableCell align="right">${row.price}</TableCell>
                                <TableCell align="right">${row.revenue}</TableCell>

                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                        
                    </td>

                </tr>

                <br></br>
                <br></br>
                <br></br>

                <tr class='row9'>
                <td class='col9'>
                    <TableContainer  align="right" component={Paper}>
                        
                        
                        <Table  sx={{ minWidth: 150, maxWidth: 1200}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            {/* <TableCell align="left"><b></b></TableCell> */}
                            <TableCell align="left"><b>Insight 4</b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
                            <TableCell align="right"><b></b></TableCell>

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
                                <TableCell align="right">${row.price}</TableCell>
                                <TableCell align="right">${row.revenue}</TableCell>

                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                        
                    </td>

                    <td class='col9'>
                    <TableContainer  align="right" component={Paper}>
                        
                        
                        <Table  sx={{ minWidth: 150, maxWidth: 1200}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            {/* <TableCell align="left"><b></b></TableCell> */}
                            <TableCell align="left"><b>Insight 5</b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
                            <TableCell align="right"><b></b></TableCell>

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
                                <TableCell align="right">${row.price}</TableCell>
                                <TableCell align="right">${row.revenue}</TableCell>

                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                        
                    </td>

                    <td class='col9'>
                    <TableContainer  align="right" component={Paper}>
                        
                        
                        <Table  sx={{ minWidth: 150, maxWidth: 1200}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            {/* <TableCell align="left"><b></b></TableCell> */}
                            <TableCell align="left"><b>Insight 6</b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
                            <TableCell align="right"><b></b></TableCell>

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
                                <TableCell align="right">${row.price}</TableCell>
                                <TableCell align="right">${row.revenue}</TableCell>

                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                        
                    </td>

                </tr>

                
                <br></br>

                <br></br>

                <br></br>

            </table>







        </div>
    )
}

export default Dashboard9;