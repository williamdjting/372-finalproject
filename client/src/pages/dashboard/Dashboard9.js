import React, { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Select, MenuItem, InputLabel} from '@mui/material';
import StockInfoContainer from '../../components/viz/StockInfoContainer';

import '../../stylesheets/Dashboard9.css'
import  axios  from 'axios';

const MARKET_CAP = 'MarketCapitalization'; // commonStockSharesOutstanding * stock price at given date (balance sheet, income statement)
const REVENUE = 'RevenuePerShareTTM'; // totalRevenue / commonStockSharesOutstanding
const REVENUE_GROWTH = 'QuarterlyRevenueGrowthYOY'; 
const PROFIT_MARGIN = 'ProfitMargin';
const PE_RATIO = 'PERatio'; //market price per share / reportedEPS
const PS_RATIO = 'PriceToSalesRatioTTM'; // market cap / total revenue of the last 12 months(1year)

const companyInfoArrSortAndFilter = (objArr, sortType, filterType) => {
    let isAscend = sortType === 'descending' ? false : true;
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
    const [sortValue, setSortValue] = useState('descending');
    const [revenuePerShareTS, setRevenuePerShareTS] = useState([]);

    const handleRowClick = (e) => {
        const code = e.currentTarget.getAttribute('data-code');
        const tableid = e.currentTarget.getAttribute('data-tableid');
        console.log(code, tableid);
    };

    const handleSortChange = (e) => {
        setSortValue(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            //prototyping
            const test = await axios.post('/stockquery/getRevenuePerShareTTMTimeSeries', {
                companySymbol: 'IBM'
            })
            const testData = await test.data;
            setRevenuePerShareTS(testData)
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
      }, [companyInfoArr]);

    return (
        <div>
            <h1 align="center">Your Insights</h1>
            <h2 align="center">[sorting tab, react hook goes here]</h2>
            <StockInfoContainer rangeData={revenuePerShareTS}/>
            <InputLabel id="sortLabel">Sort</InputLabel>
            <Select labelId="sortLabel" id="sortLabel" value={sortValue} label="sort" onChange={handleSortChange}>
                <MenuItem value='ascending'>Ascending</MenuItem>
                <MenuItem value='descending'>Descending</MenuItem>
            </Select>
            <table align="center">
                <tr className='row9'>
                    <td className='col9'>
                    <div >
                         <TableContainer  align="right" component={Paper} table-id={MARKET_CAP}>
                        <Table  sx={{ minWidth: 150, maxWidth: 1200}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell align="left"><b>Market Cap</b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {companyInfoArrSortAndFilter(companyInfoArr, sortValue, MARKET_CAP).map((row) => (
                            <TableRow
                                data-tableid={MARKET_CAP}
                                data-code={row.Symbol}
                                key={row.Symbol}
                                onClick={handleRowClick}
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
                            <TableCell align="left"><b>Revenue Per Share(TTM)</b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {companyInfoArrSortAndFilter(companyInfoArr, sortValue, REVENUE).map((row) => (
                            <TableRow
                                key={row.Symbol}
                                data-tableid={MARKET_CAP}
                                data-code={row.Symbol}
                                onClick={handleRowClick}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" component="th" scope="row">
                                {row.Name}
                                </TableCell>
                                <TableCell align="right">{row.RevenuePerShareTTM}</TableCell>
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

                            <TableCell align="left"><b>Quarterly Revenue Growth(YoY)</b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
                            <TableCell align="right"><b></b></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>    
                        {companyInfoArrSortAndFilter(companyInfoArr, sortValue, REVENUE_GROWTH).map((row) => (
                            <TableRow
                                key={row.Symbol}
                                data-tableid={MARKET_CAP}
                                data-code={row.Symbol}
                                onClick={handleRowClick}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" component="th" scope="row">
                                {row.Name}
                                </TableCell>
                                <TableCell align="right">{Math.round(row.QuarterlyRevenueGrowthYOY * 10000) / 100}%</TableCell>
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
                        {companyInfoArrSortAndFilter(companyInfoArr, sortValue, PROFIT_MARGIN).map((row) => (
                            <TableRow
                                key={row.Symbol}
                                data-tableid={MARKET_CAP}
                                data-code={row.Symbol}
                                onClick={handleRowClick}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" component="th" scope="row">
                                {row.Name}
                                </TableCell>
                                <TableCell align="right">{Math.round(row.ProfitMargin * 10000) / 100}%</TableCell>
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
                        {companyInfoArrSortAndFilter(companyInfoArr, sortValue, PE_RATIO).map((row) => (
                            <TableRow
                                key={row.Symbol}
                                data-tableid={MARKET_CAP}
                                data-code={row.Symbol}
                                onClick={handleRowClick}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" component="th" scope="row">
                                {row.Name}
                                </TableCell>
                                <TableCell align="right">{row.PERatio}</TableCell>
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
                            {companyInfoArrSortAndFilter(companyInfoArr, sortValue, PS_RATIO).map((row) => (
                                <TableRow
                                    key={row.Symbol}
                                    data-tableid={MARKET_CAP}
                                    data-code={row.Symbol}
                                    onClick={handleRowClick}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left" component="th" scope="row">
                                    {row.Name}
                                    </TableCell>
                                    <TableCell align="right">{row.PriceToSalesRatioTTM}</TableCell>
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

/*
"fiscalDateEnding": "2021-12-31",
            "reportedCurrency": "USD",
            "grossProfit": "31486000000",
            "totalRevenue": "57350000000",
            "costOfRevenue": "25865000000",
            "costofGoodsAndServicesSold": "300000000",
            "operatingIncome": "4786000000",
            "sellingGeneralAndAdministrative": "18745000000",
            "researchAndDevelopment": "6488000000",
            "operatingExpenses": "26700000000",
            "investmentIncomeNet": "None",
            "netInterestIncome": "-1155000000",
            "interestIncome": "52000000",
            "interestExpense": "26700000000",
            "nonInterestIncome": "None",
            "otherNonOperatingIncome": "-873000000",
            "depreciation": "3888000000",
            "depreciationAndAmortization": "2529000000",
            "incomeBeforeTax": "5867000000",
            "incomeTaxExpense": "124000000",
            "interestAndDebtExpense": "1155000000",
            "netIncomeFromContinuingOperations": "4712000000",
            "comprehensiveIncomeNetOfTax": "11299000000",
            "ebit": "7022000000",
            "ebitda": "9551000000",
            "netIncome": "5743000000"

            */
            // (57350000000 - 26700000000 - 26700000000 - 124000000 - 1155000000) / 57350000000