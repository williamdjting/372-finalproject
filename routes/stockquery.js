const express = require('express');
const Mutex = require('async-mutex').Mutex;
const axios = require('axios');
const helper = require('./helper');
const router = express.Router();
require('dotenv').config();
const mutex = new Mutex;
const User = require('../models/user.model');

const ALPHA_VANTAGE_QUERY_URL = 'https://www.alphavantage.co/query?function=';
const API_KEY = process.env.ALPHAVANTAGE_API_KEY
const OVERVIEW = 'OVERVIEW';
const LISTING_STATUS = 'LISTING_STATUS';
const TIME_SERIES_DAILY = 'TIME_SERIES_DAILY';
const TTL = 5000000;
const TTL_INTERVAL = 5000;

let companyOverviewCache = [];

router.get('/companyStockOverview' ,async (req, res) => {
    try {
        const cacheResponseObj = await findCompanyOverviewCache(req.body.companySymbol);
        if (cacheResponseObj) return res.json(cacheResponseObj.companyOverview);
        const response = await axios.get(createQueryUrl(OVERVIEW, req.body.companySymbol));
        const overviewObj = await response.data;
        addToCompanyOverviewCache(overviewObj, TTL);
        return res.json(overviewObj);
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: 'Failed to query stock overview'
        });
    }
});

router.get('/allStocksCodeAndName', async (req, res) => {
    try {
        const response = await axios(createQueryUrl(LISTING_STATUS))
        const csvData = await response.data;
        let jsonData = helper.csvToJSON(csvData);
        jsonData = jsonData.map(row => {
            let updatedRow = row;
            delete updatedRow.ipoDate;
            delete updatedRow. delistingDate;
            delete updatedRow.status;
            return updatedRow;
        }).filter(row => row.assetType === 'Stock' && row.name !== '');
        return res.json(jsonData);
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: 'Failed to query stock code and name'
        });
    }
});

router.post('/addUserStockTickerToDb', async (req, res) => {
    let userObj = await getUserStockListFromDbHelper(req.body.userName);
    if (!userObj.stockList || !userObj.stockList.find(obj => obj.code === req.body.stockCode)) {
        await User.updateOne({ _id: userObj._id }, { $push : { stockList : { 
            code: req.body.stockCode,
            numberOfShares: req.body.numberOfShares
        }}}).catch( err => console.warn(err));
        res.send({ post: 'ticker added success' });
    } else {
        res.send({ post: 'success, stock ticker is already in the db' });
    }
});

router.delete('/removeUserStockTickerFromDb', async (req, res) => {
    let userObj = await getUserStockListFromDbHelper(req.body.userName);
    if(userObj.stockList.find(obj => obj.code === req.body.stockCode)) {
        await User.updateOne({_id : userObj._id}, { $pull: { "stockList" : { "code" : req.body.stockCode }}});
        res.send({ post : "stock removed successfully" });
    } else {
        res.send({ post : "user does not have this stock in the db" });
    }
});

router.get('/getUserStockListFromDb', async (req, res) => {
    let userObj = await getUserStockListFromDbHelper(req.body.userName)
    res.send(userObj.stockList);
});

//todo: may need to implement time series interval later. currently in daily format
router.get('/getCompanyStockPriceTimeSeries', async (req, res) => {
    let response = await axios.get(createQueryUrl(TIME_SERIES_DAILY, req.body.companySymbol));
    res.send(response.data["Time Series (Daily)"]);
});

const getUserStockListFromDbHelper = async (usrName) => {
    return await User.findOne({ username: usrName }, '_id stockList');
};

//TODO: Need to add in other query functionality. Currently supports company overview and listing status
const createQueryUrl = (func, symbol, interval, timePeriod, seriesType) => {
    let url = '';
    switch (func) {
        case OVERVIEW:
            url = `${ALPHA_VANTAGE_QUERY_URL}${func}&symbol=${symbol}&apikey=${API_KEY}`;
            break;
        case LISTING_STATUS:
            url = `${ALPHA_VANTAGE_QUERY_URL}${func}&apikey=${API_KEY}`;
        case TIME_SERIES_DAILY:
            url = `${ALPHA_VANTAGE_QUERY_URL}${func}&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`
    }
    return url
};

const findCompanyOverviewCache = async (companySymbol) => {
    const release = await mutex.acquire();
    let retObj;
    try {
        companyOverviewCache.forEach( obj => {
            if (obj.companyOverview.Symbol === companySymbol.toUpperCase()) {
                retObj = obj;
            };
        });
    } finally {
        release();
    }
    return retObj;
};

const addToCompanyOverviewCache = async (companyOverview, ttl) => {
    const release = await mutex.acquire();
    try {
        companyOverviewCache.push({companyOverview, ttl})
    } finally {
        release();
    }
};

const decrementTTLAndClearDeadObjInCache = async () => {
    const release = await mutex.acquire();
    try {
        companyOverviewCache = companyOverviewCache.map(obj => {
            let updatedCompanyOverviewObj = obj;
            updatedCompanyOverviewObj.ttl = updatedCompanyOverviewObj.ttl - TTL_INTERVAL
            return updatedCompanyOverviewObj
        }).filter(companyOverviewObj => companyOverviewObj.ttl > 0);
    } finally {
        release();
    }
};

//debug helper statement for development
const debugPrintCache = async () => {
    const release = await mutex.acquire();
    try {
        console.log(companyOverviewCache)
    } finally {
        release();
    }
};

const cacheTimerInterval = () => {
    decrementTTLAndClearDeadObjInCache();
    // debugPrintCache();
};

setInterval(cacheTimerInterval, TTL_INTERVAL);

module.exports = router;
