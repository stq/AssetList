import React, { useState, useEffect } from 'react';
import { getForexRates } from '../../helpers/forextApiHelper'
import { ALLPAIRS, MINORPAIRS, MAJORPAIRS, SMARTFXPAIRS } from '../../helpers/codes';
import generateChart from '../../helpers/chartBuilder'

export const HEADERS = [ "Name", "Rate", "Change", "Chart", "Trade"];
export const ASC = 'asc';
export const DESC = 'desc'
export const FILTER_MAJOR = "filter_major";
export const FILTER_MINOR = "filter_minor";
export const FILTER_SMARTFX = "filter_smartfx";
export const CHART_HEIGHT = 60;
export const CHART_WIDTH = 140;

const useForexTable = ({sortDirection, sortHeader, filters, mock, apiKey}) => {

    const [ data, setData ] = useState([]);
    const [ error, setError ] = useState(false);
    useEffect(() => {
        getForexRates(mock, apiKey).then(({error, rates}) => {
            setError(error);
            if (!error) {
                let pairsToDisplay = new Set();
                if (filters.length === 0) {
                    ALLPAIRS.forEach(pair => pairsToDisplay.add(pair));
                } else {
                    if (filters.includes(FILTER_MAJOR)) MAJORPAIRS.forEach(pair => pairsToDisplay.add(pair));
                    if (filters.includes(FILTER_MINOR)) MINORPAIRS.forEach(pair => pairsToDisplay.add(pair));
                    if (filters.includes(FILTER_SMARTFX)) SMARTFXPAIRS.forEach(pair => pairsToDisplay.add(pair));
                }
                let newData = [];
                Array.from(pairsToDisplay).forEach(pair => {
                    let rateInfo = rates.get(pair);
                    newData.push({
                        from: pair[0],
                        to: pair[1],
                        current: rateInfo.todayRate,
                        change: rateInfo.change,
                        chartPath: generateChart(CHART_WIDTH, CHART_HEIGHT, rateInfo.history),
                        id: pair[0] + pair[1]
                    })
                });
                setData(newData.sort((entryOne, entryTwo) => {
                    let result;
                    if (sortHeader === HEADERS[0]) result = entryOne.id > entryTwo.id;
                    else if (sortHeader === HEADERS[1]) result = entryOne.current > entryTwo.current;
                    else if (sortHeader === HEADERS[2]) result = entryOne.change > entryTwo.change;
                    return (sortDirection === ASC ? result : !result) ? -1 : 1;
                }));
            }
        })
    }, [filters, sortHeader, sortDirection, mock, apiKey]);

    return {
        error, setError, data
    }
}

export default useForexTable;