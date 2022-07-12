import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';

function createData1(name, price, revenue, revenueGrowth, psRatio, grossProfit, ebitda, peRatio) {
    return {
        name, price, revenue, revenueGrowth, psRatio, grossProfit, ebitda, peRatio
    }
}

const rows1 = [
    createData1('Shopify', 35.57, 4600000000, 57, 28, 0.94, 335000000, 28.23)

];

function createData2(members) {
    return { members };
}

export default function GroupWatchListView() {
    const { name } = useParams();
    return (
        <Container maxWidth="lg" sx={{ my: 3 }}>
            <TableContainer align="right" component={Paper}>
                <Table sx={{ minWidth: 150, maxWidth: 1200 }} aria-label="simple table">
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
        </Container>
    )
}
