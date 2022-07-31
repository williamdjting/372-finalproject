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

export default function GroupWatchListView() {
    const { currentUser } = useAuth();
    const [group, setGroup] = useState();
    const [isAdmin, setIsAdmin] = useState();
    const [memberData, setMemberData] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = new useNavigate();
    const { name } = useParams();
    const stockTickerRef = useRef();

    const [generatedTable, setGeneratedTable] = useState([]);
    const [companyInfoArr, setCompanyInfoArr] = useState([]);
    const [sortValue, setSortValue] = useState('descending');
    const [displayType, setDisplayType] = useState(MARKET_CAP);

    useEffect(() => {
        getGroup();
    }, []);

    async function getGroup() {
        setIsLoading(true);
        await axios.get('/groups/get', {
            params: { name: name }
        }).then((res) => {
            setGroup(res.data.group);

            if (res.data.group) {
                setIsAdmin(res.data.group.admin === currentUser.username);
                const members = [];
                res.data.group.members.forEach((member) => members.push(memberModel(member)));
                setMemberData(members);

                const stocks = res.data.group.stockList;
                const companyData = [];
                res.data.group.stockList.forEach(async (stock) => {
                    const companyInfoRes = await axios.get('/stockquery/companyStockOverview', {
                        params: { companySymbol: stock }
                    });
                    if (companyInfoRes.data['Symbol'] !== undefined) {
                        companyData.push(companyInfoRes.data);
                    }
                });
                setStockData(stocks);
                setCompanyInfoArr(companyData);
            }

            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
            navigate('/dashboard');
        });

        if (stockTickerRef && stockTickerRef.current)
            stockTickerRef.current.value = "";
    }

    async function kickMember(groupName, member) {
        const res = await axios.post('/groups/kick', {
            name: groupName,
            kickedMember: member
        });

        if (res.data.success)
            await getGroup();
    }

    async function addStock(groupName, stock) {
        const res = await axios.post('/groups/addstock', {
            name: groupName,
            stock: stock
        });

        if (res.data.success)
            await getGroup();
    }

    async function removeStock(groupName, stock) {
        const res = await axios.post('/groups/removestock', {
            name: groupName,
            stock: stock
        });

        if (res.data.success)
            await getGroup();
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
                        <Button variant="contained" sx={{ mx: 1, py: 2 }} onClick={() => { addStock(group.name, stockTickerRef.current.value) }} startIcon={<Add />}>Add</Button>
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
                                            {row}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button variant="outlined" color="error" onClick={() => { removeStock(group.name, row); }} startIcon={<Delete />}>Remove</Button>
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
            <Typography component="h1" variant="h2" color="textPrimary" sx={{ mb: 1 }}>Admin Panel</Typography>
            {stockManager()}
        </>
    }

    return (
        isLoading ? <Loading /> : <div>
            <Typography component="h1" variant="h2" color="textPrimary" sx={{ mb: 1 }}>{name}</Typography>

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

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <TableContainer align="right">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left"><b>{group.name}</b></TableCell>
                                    {isAdmin && <TableCell align="right"><b>Kick Member</b></TableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {memberData.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{row.name}</TableCell>
                                        <TableCell align="right">
                                            {isAdmin && row.name !== currentUser.username ? <Button variant="outlined" color="error" onClick={() => { kickMember(group.name, row.name) }} startIcon={<Delete />}>KICK</Button> : <></>}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {isAdmin ? adminPanel() : <></>}
        </div>
    )
}
