import React, { useState, useEffect, useRef } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loading from "../../components/Loading";
import { Select, MenuItem, InputLabel } from '@mui/material';

function memberModel(name) {
    return { name }
}

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
                return (({ Symbol, Name, MarketCapitalization }) => ({ Symbol, Name, MarketCapitalization }))(obj);
            })
            if (isAscend) {
                return mappedObj.sort((a, b) => { return parseFloat(a.MarketCapitalization) - parseFloat(b.MarketCapitalization) });
            } else {
                return mappedObj.sort((a, b) => { return parseFloat(b.MarketCapitalization) - parseFloat(a.MarketCapitalization) });
            }
        case REVENUE:
            mappedObj = objArr.map(obj => {
                return (({ Symbol, Name, RevenuePerShareTTM }) => ({ Symbol, Name, RevenuePerShareTTM }))(obj);
            })
            if (isAscend) {
                return mappedObj.sort((a, b) => { return parseFloat(a.RevenuePerShareTTM) - parseFloat(b.RevenuePerShareTTM) });
            } else {
                return mappedObj.sort((a, b) => { return parseFloat(b.RevenuePerShareTTM) - parseFloat(a.RevenuePerShareTTM) });
            }
        case REVENUE_GROWTH:
            mappedObj = objArr.map(obj => {
                return (({ Symbol, Name, QuarterlyRevenueGrowthYOY }) => ({ Symbol, Name, QuarterlyRevenueGrowthYOY }))(obj);
            })
            if (isAscend) {
                return mappedObj.sort((a, b) => { return parseFloat(a.QuarterlyRevenueGrowthYOY) - parseFloat(b.QuarterlyRevenueGrowthYOY) });
            } else {
                return mappedObj.sort((a, b) => { return parseFloat(b.QuarterlyRevenueGrowthYOY) - parseFloat(a.QuarterlyRevenueGrowthYOY) });
            }
        case PROFIT_MARGIN:
            mappedObj = objArr.map(obj => {
                return (({ Symbol, Name, ProfitMargin }) => ({ Symbol, Name, ProfitMargin }))(obj);
            })
            if (isAscend) {
                return mappedObj.sort((a, b) => { return parseFloat(a.ProfitMargin) - parseFloat(b.ProfitMargin) });
            } else {
                return mappedObj.sort((a, b) => { return parseFloat(b.ProfitMargin) - parseFloat(a.ProfitMargin) });
            }
        case PE_RATIO:
            mappedObj = objArr.map(obj => {
                return (({ Symbol, Name, PERatio }) => ({ Symbol, Name, PERatio }))(obj);
            })
            if (isAscend) {
                return mappedObj.sort((a, b) => { return parseFloat(a.PERatio) - parseFloat(b.PERatio) });
            } else {
                return mappedObj.sort((a, b) => { return parseFloat(b.PERatio) - parseFloat(a.PERatio) });
            }
        case PS_RATIO:
            mappedObj = objArr.map(obj => {
                return (({ Symbol, Name, PriceToSalesRatioTTM }) => ({ Symbol, Name, PriceToSalesRatioTTM }))(obj);
            })
            if (isAscend) {
                return mappedObj.sort((a, b) => { return parseFloat(a.PriceToSalesRatioTTM) - parseFloat(b.PriceToSalesRatioTTM) });
            } else {
                return mappedObj.sort((a, b) => { return parseFloat(b.PriceToSalesRatioTTM) - parseFloat(a.PriceToSalesRatioTTM) });
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

export default function PersonalWatchListView() {
    const { currentUser } = useAuth();
    const [stockData, setStockData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = new useNavigate();
    const stockTickerRef = useRef();

    const [companyInfoArr, setCompanyInfoArr] = useState([]);
    const [sortValue, setSortValue] = useState('descending');
    const [displayType, setDisplayType] = useState(MARKET_CAP);
    const [addStockValidatorFlag, setAddStockValidatorFlag] = useState(false);

    useEffect(() => {
        getUserData();
    }, []);

    async function getUserData() {
        setIsLoading(true);
        await axios.get('/stockquery/getUserStockListFromDb').then(async (res) => {
            const stocks = res.data;
            const companyData = await getStockData(stocks);
            setStockData(stocks);
            setCompanyInfoArr(companyData);
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
            navigate('/dashboard');
        });

        if (stockTickerRef && stockTickerRef.current)
            stockTickerRef.current.value = "";
    }

    async function getStockData(stockList) {
        const companyData = [];
        await Promise.all(stockList.map(async (stock) => {
            const companyInfoRes = await axios.get('/stockquery/companyStockOverview', {
                params: { companySymbol: stock.code }
            });
            if (companyInfoRes.data['Symbol'] !== undefined)
                companyData.push(companyInfoRes.data);
        }));
        return companyData;
    }

    async function addStock(stock) {
        const validateRes = await axios.get('/stockquery/allStocksCodeAndName');
        const validateData = await validateRes.data;
        validateData.forEach(async obj => {
            if(obj.symbol === stock){
                const res = await axios.post('/stockquery/addUserStockTickerToDb', {
                    stockCode: stock
                });
        
                if (res.data.post)
                    await getUserData();
                setAddStockValidatorFlag(false);
            }
        });
        setAddStockValidatorFlag(true);
    }

    async function removeStock(stock) {
        const res = await axios.post('/stockquery/removeUserStockTickerFromDb', {
            stockCode: stock
        });

        if (res.data.post)
            await getUserData();
    }

    const handleSortChange = (e) => {
        setSortValue(e.target.value);
    };

    const handleDisplayTypeChange = (e) => {
        setDisplayType(e.target.value);
    };

    function stockManager() {
        return <>
            <Card sx={{ mb: 1 }}>
                <CardContent>
                    <Box display="flex">
                        <TextField id="outlined-basic" label="Stock Ticker" variant="outlined" inputRef={stockTickerRef} />
                        <Button variant="contained" sx={{ mx: 1, py: 2 }} onClick={() => { addStock(stockTickerRef.current.value) }} startIcon={<Add />}>Add</Button>
                    </Box>
                    <TableContainer align="right">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left"><b>Stocks</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stockData.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.code}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button variant="outlined" color="error" onClick={() => { removeStock(row.code) }} startIcon={<Delete />}>Remove</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </>
    }

    function adminPanel() {
        return <>
            <Typography component="h1" variant="h2" color="textPrimary" sx={{ mb: 1 }}>Manage Stocks</Typography>
            {addStockValidatorFlag ? <h3>You must enter valid stock ticker!</h3> : ''}
            {stockManager()}
        </>
    }

    return (
        isLoading ? <Loading /> : <div>
            <Typography component="h1" variant="h2" color="textPrimary" sx={{ mb: 1 }}>Personal</Typography>

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <InputLabel id="sortLabel">Sort</InputLabel>
                        <Select sx={{ mx: 1 }} labelId="sortLabel" id="sortLabel" value={sortValue} label="sort" onChange={handleSortChange}>
                            <MenuItem value='ascending'>Ascending</MenuItem>
                            <MenuItem value='descending'>Descending</MenuItem>
                        </Select>
                        <InputLabel id="displayLabel">Display Type</InputLabel>
                        <Select sx={{ mx: 1 }} labelId="displayLabel" id="displayType" value={displayType} label="displayType" onChange={handleDisplayTypeChange}>
                            <MenuItem value={MARKET_CAP}>Market Cap</MenuItem>
                            <MenuItem value={REVENUE}>Revenue Per Share(TTM)</MenuItem>
                            <MenuItem value={REVENUE_GROWTH}>Quarterly Revenue Growth(YoY)</MenuItem>
                            <MenuItem value={PROFIT_MARGIN}>Profit Margin</MenuItem>
                            <MenuItem value={PE_RATIO}>P/E Ratio</MenuItem>
                            <MenuItem value={PS_RATIO}>P/S Ratio</MenuItem>
                        </Select>
                    </div>
                    <TableContainer align="right" table-id={MARKET_CAP}>
                        <Table sx={{ minWidth: 150, maxWidth: 1200 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left"><b>{tableTitleMapHelper(displayType)}</b></TableCell>
                                    <TableCell align="right"><b></b></TableCell>
                                    <TableCell align="right"><b></b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {companyInfoArrSortAndFilter(companyInfoArr, sortValue, displayType).map((row) => (
                                    <TableRow
                                        data-tableid={displayType}
                                        data-code={row.Symbol}
                                        key={row.Symbol}
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
                </CardContent>
            </Card>

            {adminPanel()}
        </div>
    )
}
