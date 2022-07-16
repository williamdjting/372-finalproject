import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import '../../stylesheets/Dashboard9.css'
import  axios  from 'axios';

const MARKET_CAP = 'MarketCapitalization';
const REVENUE = 'RevenuePerShareTTM';
const REVENUE_GROWTH = 'QuarterlyRevenueGrowthYOY';
const PROFIT_MARGIN = 'ProfitMargin';
const PE_RATIO = 'PERatio';
const PS_RATIO = 'PriceToSalesRatioTTM';

function createData1(name, price, revenue, revenueGrowth, psRatio, grossProfit, ebitda, peRatio ) {
    return { name, price, revenue, revenueGrowth, psRatio, grossProfit, ebitda, peRatio
  }
}
  
const rows1 = [
    createData1('Shopify', 35.57, 4600000000,57,28, 0.94,335000000,28.23),

];

const companyInfoArrSortAndFilter = (objArr, isAscend, filterType) => {
    let mappedObj;
    switch (filterType) {
        case MARKET_CAP:
            mappedObj = objArr.map(obj => {
                return (({ Symbol, Name,  MarketCapitalization}) => ({ Symbol, Name,  MarketCapitalization }))(obj);
            })
            if (isAscend) {
                return mappedObj.sort((a,b) => {return parseFloat(a.MarketCapitalization) - parseFloat(b.MarketCapitalization) })
            } else {
                return mappedObj.sort((a,b) => {return parseFloat(b.MarketCapitalization) - parseFloat(a.MarketCapitalization) });
            }
        case REVENUE:
            mappedObj = objArr.map(obj => {
                return (({ Symbol, Name,  RevenuePerShareTTM}) => ({ Symbol, Name,  RevenuePerShareTTM }))(obj);
            })
            if (isAscend) {
                return mappedObj.sort((a,b) => {return parseFloat(a.RevenuePerShareTTM) - parseFloat(b.RevenuePerShareTTM) })
            } else {
                return mappedObj.sort((a,b) => {return parseFloat(b.RevenuePerShareTTM) - parseFloat(a.RevenuePerShareTTM) });
            }
        case REVENUE_GROWTH:
            mappedObj = objArr.map(obj => {
                return (({ Symbol, Name,  QuarterlyRevenueGrowthYOY}) => ({ Symbol, Name,  QuarterlyRevenueGrowthYOY }))(obj);
            })
            if (isAscend) {
                return mappedObj.sort((a,b) => {return parseFloat(a.QuarterlyRevenueGrowthYOY) - parseFloat(b.QuarterlyRevenueGrowthYOY) })
            } else {
                return mappedObj.sort((a,b) => {return parseFloat(b.QuarterlyRevenueGrowthYOY) - parseFloat(a.QuarterlyRevenueGrowthYOY) });
            }
        case PROFIT_MARGIN:
            mappedObj = objArr.map(obj => {
                return (({ Symbol, Name,  ProfitMargin}) => ({ Symbol, Name,  ProfitMargin }))(obj);
            })
            if (isAscend) {
                return mappedObj.sort((a,b) => {return parseFloat(a.ProfitMargin) - parseFloat(b.ProfitMargin) })
            } else {
                return mappedObj.sort((a,b) => {return parseFloat(b.ProfitMargin) - parseFloat(a.ProfitMargin) });
            }
        case PE_RATIO:
            mappedObj = objArr.map(obj => {
                return (({ Symbol, Name,  PERatio}) => ({ Symbol, Name,  PERatio }))(obj);
            })
            if (isAscend) {
                return mappedObj.sort((a,b) => {return parseFloat(a.PERatio) - parseFloat(b.PERatio) })
            } else {
                return mappedObj.sort((a,b) => {return parseFloat(b.PERatio) - parseFloat(a.PERatio) });
            }
        case PS_RATIO:
            mappedObj = objArr.map(obj => {
                return (({ Symbol, Name,  PriceToSalesRatioTTM}) => ({ Symbol, Name,  PriceToSalesRatioTTM }))(obj);
            })
            if (isAscend) {
                return mappedObj.sort((a,b) => {return parseFloat(a.PriceToSalesRatioTTM) - parseFloat(b.PriceToSalesRatioTTM) })
            } else {
                return mappedObj.sort((a,b) => {return parseFloat(b.PriceToSalesRatioTTM) - parseFloat(a.PriceToSalesRatioTTM) });
            }
        default:
            return objArr;
    };

};

function Dashboard9() {

    const [companyInfoArr, setCompanyInfoArr] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        const response = await axios.get('/stockquery/getUserStockListFromDb');
        const objectArr = await response.data;
        let companyInfoArr = [];
        for await (let arrObj of objectArr) {
            const companyInfoRes = await axios.post('/stockquery/companyStockOverview', {
                companySymbol: arrObj.code  
            })
            companyInfoArr.push(await companyInfoRes.data);
        }
        setCompanyInfoArr(companyInfoArr);
        };
        fetchData();
      }, []);

      useEffect(() => {
        console.log(companyInfoArrSortAndFilter(companyInfoArr, false, PROFIT_MARGIN))
      }, [companyInfoArr]);

    return (
        <div>
            <h1 align="center">Your Insights</h1>
            <h2 align="center">[sorting tab, react hook goes here]</h2>
            <table align="center">
                <tr className='row9'>
                    <td className='col9'>
                    <div >
                         <TableContainer  align="right" component={Paper}>
                        <Table  sx={{ minWidth: 150, maxWidth: 1200}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell align="left"><b>Market Cap</b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {companyInfoArrSortAndFilter(companyInfoArr, false, MARKET_CAP).map((row) => (
                            <TableRow
                                key={row.Symbol}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" component="th" scope="row">
                                {row.Name}
                                </TableCell>
                                <TableCell align="right">${row.MarketCapitalization}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                        </div>
                    </td>
                    <td className='col9'>
                    <TableContainer  align="right" component={Paper}> 
                        <Table  sx={{ minWidth: 150, maxWidth: 1200}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell align="left"><b>Revenue</b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {companyInfoArrSortAndFilter(companyInfoArr, false, REVENUE).map((row) => (
                            <TableRow
                                key={row.Symbol}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" component="th" scope="row">
                                {row.Name}
                                </TableCell>
                                <TableCell align="right">${row.RevenuePerShareTTM}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    </td>
                    <td className='col9'>
                    <TableContainer  align="right" component={Paper}>

                        <Table  sx={{ minWidth: 150, maxWidth: 1200}} aria-label="simple table">
                        <TableHead>
                            <TableRow>

                            <TableCell align="left"><b>Revenue Growth</b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
                            <TableCell align="right"><b></b></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>    
                        {companyInfoArrSortAndFilter(companyInfoArr, false, REVENUE_GROWTH).map((row) => (
                            <TableRow
                                key={row.Symbol}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" component="th" scope="row">
                                {row.Name}
                                </TableCell>
                                <TableCell align="right">${row.QuarterlyRevenueGrowthYOY}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer> 
                    </td>
                </tr>
                <tr className='row9'>
                <td className='col9'>
                    <TableContainer  align="right" component={Paper}>
                        <Table  sx={{ minWidth: 150, maxWidth: 1200}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell align="left"><b>Profit Margin</b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>   
                        {companyInfoArrSortAndFilter(companyInfoArr, false, PROFIT_MARGIN).map((row) => (
                            <TableRow
                                key={row.Symbol}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" component="th" scope="row">
                                {row.Name}
                                </TableCell>
                                <TableCell align="right">${row.ProfitMargin}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    </td>
                    <td className='col9'>
                    <TableContainer  align="right" component={Paper}>
                        <Table  sx={{ minWidth: 150, maxWidth: 1200}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell align="left"><b>P/E Ratio</b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
                            <TableCell align="right"><b></b></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {companyInfoArrSortAndFilter(companyInfoArr, false, PE_RATIO).map((row) => (
                            <TableRow
                                key={row.Symbol}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" component="th" scope="row">
                                {row.Name}
                                </TableCell>
                                <TableCell align="right">${row.PERatio}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>   
                    </td>
                    <td className='col9'>
                    <TableContainer  align="right" component={Paper}>
                        <Table  sx={{ minWidth: 150, maxWidth: 1200}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell align="left"><b>P/S Ratio</b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {companyInfoArrSortAndFilter(companyInfoArr, false, PS_RATIO).map((row) => (
                                <TableRow
                                    key={row.Symbol}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left" component="th" scope="row">
                                    {row.Name}
                                    </TableCell>
                                    <TableCell align="right">${row.PriceToSalesRatioTTM}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>  
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default Dashboard9;