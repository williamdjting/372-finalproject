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
import '../../stylesheets/Dashboard2.css'

function createData1(name, price, revenue, revenueGrowth, psRatio, grossProfit, ebitda, peRatio ) {
    return { name, price, revenue, revenueGrowth, psRatio, grossProfit, ebitda, peRatio
  }
}
  
const rows1 = [
    createData1('Shopify', 35.57, 4600000000,57,28, 0.94,335000000,28.23)

];


function createData2(groupName, groupLink ) {
    return { groupName, groupLink};
  }
  
const rows2 = [
    createData2('Tech Stocks', '/groups/techstocks' ),
    createData2('Value Stocks', '/groups/valuestocks' ),

];

function Dashboard2() {
    return (
        <div>

            <table align="center" class="dashboard2table">
                <br></br>
            <h1 id="blockcontainer" align="center">Your Personal Watchlist</h1>
                <tr>
                    <td>

                        <div id="bloc1">
                        <TableContainer  align="right" component={Paper}>
            <Table  sx={{ minWidth: 150, maxWidth: 1200}} aria-label="simple table">
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
            <div id="bloc2">
            <br></br>
            <TableContainer  align="right" component={Paper}>
            <Table  sx={{ minWidth: 200, maxWidth: 600}} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell align="left"><b>My Groups</b></TableCell>
                <TableCell align="left"><b>Jump To</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows2.map((row) => (
                <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell align="left" component="th" scope="row">
                    {row.groupName}
                    </TableCell>
                    <TableCell align="right">
                    <Box sx={{ '& button': { m: 1 } }}>
                        <div>
                            <Button size="small" variant="contained" href={row.groupLink}>Select</Button>
                        </div>    
                    </Box>
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

export default Dashboard2;