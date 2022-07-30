import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Select, MenuItem, InputLabel
} from '@mui/material';
import StockInfoContainer from '../../components/viz/StockInfoContainer';

import '../../stylesheets/Dashboard9.css'
import axios from 'axios';

const MARKET_CAP = 'MarketCapitalization'; // commonStockSharesOutstanding * stock price at given date (balance sheet, income statement)
const REVENUE = 'RevenuePerShareTTM'; // totalRevenue / commonStockSharesOutstanding
const REVENUE_GROWTH = 'QuarterlyRevenueGrowthYOY';
const PROFIT_MARGIN = 'ProfitMargin';
const PE_RATIO = 'PERatio'; //market price per share / reportedEPS
const PS_RATIO = 'PriceToSalesRatioTTM'; // market cap / total revenue of the last 12 months(1year)

const companyInfoArrSortAndFilter = (objArr, sortType, filterType, topN) => {
    let isAscend = sortType === 'descending' ? false : true;
    let mappedObj;
    switch (filterType) {
        case MARKET_CAP:
            mappedObj = objArr.map(obj => {
                return (({ Symbol, Name, MarketCapitalization }) => ({ Symbol, Name, MarketCapitalization }))(obj);
            })
            if (isAscend) {
                return mappedObj.sort((a, b) => { return parseFloat(a.MarketCapitalization) - parseFloat(b.MarketCapitalization) }).slice(0, topN);
            } else {
                return mappedObj.sort((a, b) => { return parseFloat(b.MarketCapitalization) - parseFloat(a.MarketCapitalization) }).slice(0, topN);
            }
        case REVENUE:
            mappedObj = objArr.map(obj => {
                return (({ Symbol, Name, RevenuePerShareTTM }) => ({ Symbol, Name, RevenuePerShareTTM }))(obj);
            })
            if (isAscend) {
                return mappedObj.sort((a, b) => { return parseFloat(a.RevenuePerShareTTM) - parseFloat(b.RevenuePerShareTTM) }).slice(0, topN);
            } else {
                return mappedObj.sort((a, b) => { return parseFloat(b.RevenuePerShareTTM) - parseFloat(a.RevenuePerShareTTM) }).slice(0, topN);
            }
        case REVENUE_GROWTH:
            mappedObj = objArr.map(obj => {
                return (({ Symbol, Name, QuarterlyRevenueGrowthYOY }) => ({ Symbol, Name, QuarterlyRevenueGrowthYOY }))(obj);
            })
            if (isAscend) {
                return mappedObj.sort((a, b) => { return parseFloat(a.QuarterlyRevenueGrowthYOY) - parseFloat(b.QuarterlyRevenueGrowthYOY) }).slice(0, topN);
            } else {
                return mappedObj.sort((a, b) => { return parseFloat(b.QuarterlyRevenueGrowthYOY) - parseFloat(a.QuarterlyRevenueGrowthYOY) }).slice(0, topN);
            }
        case PROFIT_MARGIN:
            mappedObj = objArr.map(obj => {
                return (({ Symbol, Name, ProfitMargin }) => ({ Symbol, Name, ProfitMargin }))(obj);
            })
            if (isAscend) {
                return mappedObj.sort((a, b) => { return parseFloat(a.ProfitMargin) - parseFloat(b.ProfitMargin) }).slice(0, topN);
            } else {
                return mappedObj.sort((a, b) => { return parseFloat(b.ProfitMargin) - parseFloat(a.ProfitMargin) }).slice(0, topN);
            }
        case PE_RATIO:
            mappedObj = objArr.map(obj => {
                return (({ Symbol, Name, PERatio }) => ({ Symbol, Name, PERatio }))(obj);
            })
            if (isAscend) {
                return mappedObj.sort((a, b) => { return parseFloat(a.PERatio) - parseFloat(b.PERatio) }).slice(0, topN);
            } else {
                return mappedObj.sort((a, b) => { return parseFloat(b.PERatio) - parseFloat(a.PERatio) }).slice(0, topN);
            }
        case PS_RATIO:
            mappedObj = objArr.map(obj => {
                return (({ Symbol, Name, PriceToSalesRatioTTM }) => ({ Symbol, Name, PriceToSalesRatioTTM }))(obj);
            })
            if (isAscend) {
                return mappedObj.sort((a, b) => { return parseFloat(a.PriceToSalesRatioTTM) - parseFloat(b.PriceToSalesRatioTTM) }).slice(0, topN);
            } else {
                return mappedObj.sort((a, b) => { return parseFloat(b.PriceToSalesRatioTTM) - parseFloat(a.PriceToSalesRatioTTM) }).slice(0, topN);
            }
        default:
            return objArr;
    };
};

const tableTitleMapHelper = (displayType) => {
    switch (displayType) {
        case MARKET_CAP:
            return 'Market Cap';
        case REVENUE:
            return 'Revenue Per Share(TTM)';
        case REVENUE_GROWTH:
            return 'Quarterly Revenue Growth(YoY)';
        case PROFIT_MARGIN:
            return 'Profit Margin';
        case PE_RATIO:
            return 'P/E Ratio';
        case PS_RATIO:
            return 'P/S Ratio'
        default:
            return displayType;
    }
};

const valueFormatHelper = (displayType, rowValue) => {
    switch (displayType) {
        case MARKET_CAP:
            return `$${rowValue}`;
        case REVENUE:
            return rowValue; //may change in the future
        case REVENUE_GROWTH:
            return `${(rowValue * 100).toFixed(2)}%`;
        case PROFIT_MARGIN:
            return `${(rowValue * 100).toFixed(2)}%`;
        case PE_RATIO:
            return rowValue;
        case PS_RATIO:
            return rowValue;
        default:
            return displayType;
    }
};

function Dashboard9() {

    const [companyInfoArr, setCompanyInfoArr] = useState([]);
    const [sortValue, setSortValue] = useState('descending');
    const [revenuePerShareTS, setRevenuePerShareTS] = useState([]);
    const [displayType, setDisplayType] = useState(MARKET_CAP);

    const handleRowClick = (e) => {
        const code = e.currentTarget.getAttribute('data-code');
        const tableid = e.currentTarget.getAttribute('data-tableid');
        console.log(code, tableid);
    };

    const handleSortChange = (e) => {
        setSortValue(e.target.value);
    };

    const handleDisplayTypeChange = (e) => {
        setDisplayType(e.target.value);
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
            <StockInfoContainer rangeData={revenuePerShareTS} />
            <InputLabel id="sortLabel">Sort</InputLabel>
            <Select labelId="sortLabel" id="sortLabel" value={sortValue} label="sort" onChange={handleSortChange}>
                <MenuItem value='ascending'>Ascending</MenuItem>
                <MenuItem value='descending'>Descending</MenuItem>
            </Select>
            <InputLabel id="displayLabel">Display Type</InputLabel>
            <Select labelId="displayLabel" id="displayType" value={displayType} label="displayType" onChange={handleDisplayTypeChange}>
                <MenuItem value={MARKET_CAP}>Market Cap</MenuItem>
                <MenuItem value={REVENUE}>Revenue Per Share(TTM)</MenuItem>
                <MenuItem value={REVENUE_GROWTH}>Quarterly Revenue Growth(YoY)</MenuItem>
                <MenuItem value={PROFIT_MARGIN}>Profit Margin</MenuItem>
                <MenuItem value={PE_RATIO}>P/E Ratio</MenuItem>
                <MenuItem value={PS_RATIO}>P/S Ratio</MenuItem>
            </Select>
            <TableContainer align="right" component={Paper} table-id={MARKET_CAP}>
                <Table sx={{ minWidth: 150, maxWidth: 1200 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"><b>{tableTitleMapHelper(displayType)}</b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companyInfoArrSortAndFilter(companyInfoArr, sortValue, displayType, 5).map((row) => (
                            <TableRow
                                data-tableid={displayType}
                                data-code={row.Symbol}
                                key={row.Symbol}
                                onClick={handleRowClick}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" component="th" scope="row">
                                    {row.Name}
                                </TableCell>
                                <TableCell align="right">{valueFormatHelper(displayType, row[displayType])}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Dashboard9;
