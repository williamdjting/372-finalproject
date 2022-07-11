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

import '../../stylesheets/Dashboard5.css'

function createData1(name, price, revenue, revenueGrowth, psRatio, grossProfit, ebitda, peRatio ) {
    return { name, price, revenue, revenueGrowth, psRatio, grossProfit, ebitda, peRatio
  }
}
  
const rows1 = [
    createData1('Shopify', 35.57, 4600000000,57,28, 0.94,335000000,28.23)

];

const rows3 = [
    {groups: "tech stocks only"} , {groups: "value stocks only"}

];


function createData2(members ) {
    return { members};
  }
  
const rows2 = [
    createData2('Tommy' ),
    createData2('Wilson' ),

];

function Dashboard5() {
    return (
        <div>

            <table align="center">
                <br></br>
            <h1 align="center">Your Group Watchlists</h1>
            {/* there is a formatting issue, the tr height starts at the public groups box */}
                <tr>
                    <td>
                        <div id="bloc51">
                        <h2 align="center">[Sorting hook goes here]</h2>
                        <TableContainer  align="right" component={Paper}>

            {/* need to move this table up to match the same line as public groups */}
            <Table  sx={{ minWidth: 150, maxWidth: 1200}} aria-label="simple table">
                
            <TableHead>
                <TableRow>
                {/* <TableCell align="left"><b></b></TableCell> */}
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


                        </div>

                    </td>


        <td>

            <div id="bloc52">


            <TableContainer  align="right" component={Paper}>
        
            <Table  sx={{ minWidth: 200, maxWidth: 600}} aria-label="simple table">
            <TableHead>
                <TableRow>

                <TableCell align="left"><b>Public Groups</b></TableCell>
                <TableCell align="left"><b>Join Group</b></TableCell>
                

                </TableRow>
            </TableHead>
            {/* //fetch API right here inside <tablebody> and render the hook here// */}
            <TableBody>

                
                {rows3.map((row) => (
                <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >

                    <TableCell align="left" component="th" scope="row">
                    {row.groups}
                    </TableCell>
                    <TableCell align="right">

                    <Box sx={{ '& button': { m: 1 } }}>
                        <div>
                            <Button size="small" variant="contained">Join</Button>
                        {/* </Stack> */}
                        </div>    
                    </Box>

                    
                    </TableCell>

                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
                    <br></br>
                    <br></br>
        <TableContainer  align="right" component={Paper}>
        
            <Table  sx={{ minWidth: 200, maxWidth: 600}} aria-label="simple table">
            <TableHead>
                <TableRow>

                <TableCell align="left"><b>Group Members</b></TableCell>
                <TableCell align="left"><b></b></TableCell>
                

                </TableRow>
            </TableHead>
            <TableBody>

                
                {rows2.map((row) => (
                <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >

                    <TableCell align="left" component="th" scope="row">
                    {row.members}
                    </TableCell>
                    <TableCell align="right">


                    </TableCell>

                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>


            </div>


        </td>

        
            </tr>

            <tr>


                
            </tr>

        </table>
      </div>
    )
}

export default Dashboard5;