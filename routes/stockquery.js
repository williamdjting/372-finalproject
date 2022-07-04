const express = require('express');
const fetch = require('node-fetch');
const Mutex = require('async-mutex').Mutex;
const router = express.Router();
const mutex = new Mutex;

const ALPHA_VANTAGE_QUERY_URL = 'https://www.alphavantage.co/query?function=';
const API_KEY = 'O5LYBCJIH9QHU58F'; //temp API KEY. still need to premium 
const OVERVIEW = "OVERVIEW";
const TTL = 5000000;
const TTL_INTERVAL = 5000;

let companyOverviewCache = [];

router.get('/companyStockOverview', async (req, res) => {
    try {
        const cacheResponseObj = await findCompanyOverviewCache(req.query.companySymbol);
        if (cacheResponseObj) return res.json(cacheResponseObj);
        const response = await fetch(createQuery(OVERVIEW, req.query.companySymbol));
        const overviewObj = await response.json();
        addToCompanyOverviewCache(overviewObj, TTL);
        return res.json(overviewObj);
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: 'Failed to query company stock'
        });
    }
});

//TODO: Need to add in other query functionality. Currently supports company overview. Commented out the query with full functionality for future use.
const createQuery = (func, symbol, interval, timePeriod, seriesType) => {
    // let stockUrl = `${ALPHA_VANTAGE_QUERY_URL}${func}&symbol=${symbol}&interval=${interval}&time_period=${timePeriod}&series_type=${seriesType}&apikey=${API_KEY}`;
    let overviewUrl = `${ALPHA_VANTAGE_QUERY_URL}${func}&symbol=${symbol}&apikey=${API_KEY}`;
    return overviewUrl
};

const findCompanyOverviewCache = async (companySymbol) => {
    const release = await mutex.acquire();
    let retObj;
    try {
        companyOverviewCache.forEach( obj => {
            console.log(obj.companyOverview.Symbol === companySymbol.toUpperCase())
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
