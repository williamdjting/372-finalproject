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

function Insights() {
    const [companyInfoArr, setCompanyInfoArr] = useState([]);
    const [sortValue, setSortValue] = useState('descending');
    const [revenuePerShareTS, setRevenuePerShareTS] = useState([]);
    const [displayType, setDisplayType] = useState(MARKET_CAP);
    const [chartData, setChartData] = useState({});

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
            const response = await axios.get('/stockquery/getUserStockListFromDb');
            const objectArr = await response.data;
            let companyInfoArr = [];
            for await (let arrObj of objectArr) {
                const companyInfoRes = await axios.get('/stockquery/companyStockOverview', {
                    params: { companySymbol: arrObj.code }
                });
                companyInfoArr.push(await companyInfoRes.data);
            }
            setCompanyInfoArr(companyInfoArr);
            let initialChartData = companyInfoArrSortAndFilter(companyInfoArr, sortValue, displayType, 5)[0];
            console.log('?', initialChartData);
            let chartObj = {};
            const marketCapRes= await axios.post('/stockquery/getMarketCapitializationTimeSeries', {
                companySymbol: initialChartData.Symbol
            });
            let marketCapData = await marketCapRes.data;
            marketCapData = marketCapData.map(obj => {
                let newObj = {};
                newObj.Date = obj.Date;
                newObj.market_capitialization = parseFloat(obj.MarketCapitalization)
                return newObj;
            });
            chartObj.rangeData = marketCapData;
            chartObj.ydataKey = "market_capitialization";
            chartObj.xdataKey = "Date";
            setChartData(chartObj);

        };
        fetchData();
    }, []);

    useEffect(() => {
    }, [companyInfoArr]);

    useEffect(() => {
        switch (displayType) {
            case MARKET_CAP:
                const fetchMarketCapData = async () => {
                    let initialChartData = companyInfoArrSortAndFilter(companyInfoArr, sortValue, displayType, 5)[0];
                    let chartObj = {};
                    const marketCapRes = await axios.post('/stockquery/getMarketCapitializationTimeSeries', {
                        companySymbol: initialChartData.Symbol
                    });
                    let marketCapData = await marketCapRes.data;
                    marketCapData = marketCapData.map(obj => {
                        let newObj = {};
                        newObj.Date = obj.Date;
                        newObj.market_capitialization = parseFloat(obj.MarketCapitalization)
                        return newObj;
                    });
                    chartObj.rangeData = marketCapData;
                    chartObj.ydataKey = "market_capitialization";
                    chartObj.xdataKey = "Date";
                    setChartData(chartObj);
                }
                fetchMarketCapData();
                break;
            case REVENUE:
                const fetchRevenueData = async () => {
                    let initialChartData = companyInfoArrSortAndFilter(companyInfoArr, sortValue, displayType, 5)[0];
                    const revenueRes = await axios.post('/stockquery/getRevenuePerShareTTMTimeSeries', {
                        companySymbol: initialChartData.Symbol
                    });
                    let revenueData = revenueRes.data;
                    let chartObj = {};
                    revenueData = revenueData.map(obj => {
                        console.log(obj);
                        let newObj = {};
                        newObj.Date = obj.Date;
                        newObj['Annual Revenue Per Share'] = parseFloat(obj['Annual Revenue Per Share']);
                        return newObj;
                    });
                    chartObj.rangeData = revenueData;
                    chartObj.ydataKey = "Annual Revenue Per Share";
                    chartObj.xdataKey = "Date";
                    setChartData(chartObj);
                };
                fetchRevenueData();
                break;
            case REVENUE_GROWTH:
                setChartData({});
                break;
            case PROFIT_MARGIN:
                setChartData({});
                break;
            case PE_RATIO:
                setChartData({});
                break;
            case PS_RATIO:
                const fetchPSRatioData = async () => {
                    let initialChartData = companyInfoArrSortAndFilter(companyInfoArr, sortValue, displayType, 5)[0];
                    console.log(initialChartData.Symbol)
                    const psRes = await axios.post('/stockquery/getPriceToSalesRatioTTMTimeSeries', {
                        companySymbol: initialChartData.Symbol
                    });
                    let psResData = psRes.data;
                    let chartObj = {};
                    psResData = psResData.map(obj => {
                        let newObj = {};
                        newObj.Date = obj.Date;
                        newObj['PS_Ratio'] = parseFloat(obj['PriceToSalesRatioTTM']);
                        return newObj;
                    });
                    chartObj.rangeData = psResData;
                    chartObj.ydataKey = "PS_Ratio";
                    chartObj.xdataKey = "Date";
                    setChartData(chartObj);
                };
                fetchPSRatioData();
                break;
            default:
                setChartData({});
                break;
        }
        
    }, [displayType]);

    return (
        <div>
            <h1 align="center">Your Insights</h1>
            {Object.keys(chartData).length !== 0 ? <StockInfoContainer rangeData={chartData.rangeData} xdataKey={chartData.xdataKey} ydataKey={chartData.ydataKey} /> : <h3>{`${tableTitleMapHelper(displayType)} visualization is not supported`}</h3>}
            <div style={{display: 'inline-flex'}}>
                <div>
                <InputLabel id="sortLabel">Sort</InputLabel>
                <Select labelId="sortLabel" id="sortLabel" value={sortValue} label="sort" onChange={handleSortChange}>
                    <MenuItem value='ascending'>Ascending</MenuItem>
                    <MenuItem value='descending'>Descending</MenuItem>
                </Select>
                </div>
                <div>
                <InputLabel id="displayLabel">Display Type</InputLabel>
                <Select labelId="displayLabel" id="displayType" value={displayType} label="displayType" onChange={handleDisplayTypeChange}>
                    <MenuItem value={MARKET_CAP}>Market Cap</MenuItem>
                    <MenuItem value={REVENUE}>Revenue Per Share(TTM)</MenuItem>
                    <MenuItem value={REVENUE_GROWTH}>Quarterly Revenue Growth(YoY)</MenuItem>
                    <MenuItem value={PROFIT_MARGIN}>Profit Margin</MenuItem>
                    <MenuItem value={PE_RATIO}>P/E Ratio</MenuItem>
                    <MenuItem value={PS_RATIO}>P/S Ratio</MenuItem>
                </Select>
                </div>
            </div>
            
            <TableContainer align="right" component={Paper} table-id={MARKET_CAP}>
                <Table sx={{ minWidth: 150, maxWidth: 1200 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        <TableCell align="left"><b>Company Name</b></TableCell>
                            <TableCell align="right"><b>{tableTitleMapHelper(displayType)}</b></TableCell>
                            
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

export default Insights;
