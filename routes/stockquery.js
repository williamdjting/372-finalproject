const express = require('express');
const fetch = require('node-fetch');
const Mutex = require('async-mutex').Mutex;
const router = express.Router();
require('dotenv').config();
const mutex = new Mutex;
const auth = require('./users');

const ALPHA_VANTAGE_QUERY_URL = 'https://www.alphavantage.co/query?function=';
const API_KEY = process.env.ALPHAVANTAGE_API_KEY
const OVERVIEW = 'OVERVIEW';
const LISTING_STATUS = 'LISTING_STATUS'
const TTL = 5000000;
const TTL_INTERVAL = 5000;

let companyOverviewCache = [];

router.get('/companyStockOverview', auth.HasToken, async (req, res) => {
    try {
        const cacheResponseObj = await findCompanyOverviewCache(req.query.companySymbol);
        if (cacheResponseObj) return res.json(cacheResponseObj.companyOverview);
        const response = await fetch(createQueryUrl(OVERVIEW, req.query.companySymbol));
        const overviewObj = await response.json();
        addToCompanyOverviewCache(overviewObj, TTL);
        return res.json(overviewObj);
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: 'Failed to query stock overview'
        });
    }
});

router.get('/allStocksCodeAndName', auth.HasToken, async (req, res) => {
    try {
        const response = await fetch(createQueryUrl(LISTING_STATUS))
        const csvData = await response.text();
        let jsonData = csvToJSON(csvData);
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

//TODO: Need to add in other query functionality. Currently supports company overview and listing status
const createQueryUrl = (func, symbol, interval, timePeriod, seriesType) => {
    let url = '';
    switch (func) {
        case OVERVIEW:
            url = `${ALPHA_VANTAGE_QUERY_URL}${func}&symbol=${symbol}&apikey=${API_KEY}`;
            break;
        case LISTING_STATUS:
            url = `${ALPHA_VANTAGE_QUERY_URL}${func}&apikey=${API_KEY}`;
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

//citation
//dervied from: https://stackoverflow.com/questions/64873956/converting-csv-tao-json-and-putting-json-into-html-table-with-js
const csvToJSON = (csvDataString) => {
    const rowsHeader = csvDataString.split('\r').join('').split('\n');
    const headers = rowsHeader[0].split(',');
    const content = rowsHeader.filter( (_,i) => i > 0 );
    const jsonFormatted = content.map(row => {
        const columns = row.split(',');
        return columns.reduce((p,c, i) => {
            p[headers[i]] = c;
            return p;
        }, {})
    })
    return jsonFormatted;
}

setInterval(cacheTimerInterval, TTL_INTERVAL);

module.exports = router;
