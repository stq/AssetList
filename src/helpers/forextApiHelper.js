import dayjs from "dayjs"
import mockRates from './mockRates.js';
import cachedFetch from './cachedFetch';
import {ALLPAIRS} from './codes';

const conversionCurrenciesGroupedByBaseCurrency = (function () {
    const result = {};
    const baseCurrenciesList = ALLPAIRS.map(([baseCurrency]) => baseCurrency).filter((value, index, self) => self.indexOf(value) === index);
    baseCurrenciesList.forEach(baseCurrency => {
        result[baseCurrency] = ALLPAIRS.filter(pair => pair[0] === baseCurrency).map(pair => pair[1]);
    })
    return result;
})();


const RATES_CACHE_LIFETIME = 1000 * 60 * 24;
const FIXER_DATE_FORMAT = 'YYYY-MM-DD';

function stalenessCheckFn(timestamp) {
    return !timestamp || (Date.now() - timestamp > RATES_CACHE_LIFETIME);
}

function dateCompareFn(dateOne, dateTwo) {
    return dayjs(dateOne, FIXER_DATE_FORMAT).isBefore(dayjs(dateTwo, FIXER_DATE_FORMAT));
}

export function getForexRates(useMockData, apiKey) {
    var myHeaders = new Headers();
    myHeaders.append("apikey", apiKey);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    const startDate = dayjs().add(-1, 'month').format(FIXER_DATE_FORMAT);
    const endDate = dayjs().format(FIXER_DATE_FORMAT);

    let ratesPromises = [];
    let aggregateResult = [];
    let hadError = false;

    if (useMockData) {
        return Promise.resolve({
            rates: mockRates
        })
    }

    for (let baseCurrency of Object.keys(conversionCurrenciesGroupedByBaseCurrency)) {
        let conversionCurrencies = conversionCurrenciesGroupedByBaseCurrency[baseCurrency].join();
        ratesPromises.push(
            cachedFetch(`https://api.apilayer.com/fixer/timeseries?start_date=${startDate}&end_date=${endDate}&base=${baseCurrency}&symbols=${conversionCurrencies}`, requestOptions, stalenessCheckFn, apiKey)
                .then(responseJson => {
                    if( responseJson.base && responseJson.rates ) {
                        aggregateResult.push(responseJson)
                    } else {
                        console.log("Fixer response is not rates response");
                        hadError = true;
                    }
                })
                .catch(error => { hadError = true; console.log('Error while accessing rates API, check connectivity or request quota usage', error)})
        )
    }
    return Promise.all(ratesPromises)
        .then(() => {

            if (hadError) {
                console.log('Error while getting real data, using mock data');
                return {
                    error: true
                }
            }

            const ratesData = new Map();
            for (let baseResult of aggregateResult) {
                const baseCurrency = baseResult.base;
                const dates = Object.keys(baseResult.rates).sort(dateCompareFn);

                const yesterdayDate = dayjs(baseResult.end_date, FIXER_DATE_FORMAT).add(-1, 'day').format(FIXER_DATE_FORMAT);
                for (let date of dates) {
                    let isYesterdayRate = date === yesterdayDate;
                    let isTodayRate = date === baseResult.end_date;
                    let rate = baseResult.rates[date];

                    for (let conversionCurrency of Object.keys(rate)) {
                        let rateKey = ALLPAIRS.find(([baseCode, conversionCode]) => baseCode === baseCurrency && conversionCode === conversionCurrency);
                        if (!rateKey) continue;//this pair is not in display list, so just ignore it

                        let rateInfo = ratesData.get(rateKey) || {};
                        ratesData.set(rateKey, rateInfo);

                        rateInfo.history = rateInfo.history || [];
                        rateInfo.history.push(rate[conversionCurrency])

                        if (isYesterdayRate) rateInfo.yesterdayRate = rate[conversionCurrency];
                        if (isTodayRate) {
                            rateInfo.todayRate = rate[conversionCurrency];
                            rateInfo.change = (rateInfo.todayRate - rateInfo.yesterdayRate).toFixed(8);
                        }
                    }
                }
            }

            return {
                error: false,
                rates: ratesData
            };
        })

}

