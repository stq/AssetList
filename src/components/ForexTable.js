import React, { useState } from 'react';
import { Table, TableBody, TableSortLabel, TableCell, TableHead, TableRow, Paper, Button, Alert} from '@mui/material';
import { ArrowDropUpIcon, ArrowDropDownIcon } from '@mui/icons-material';
import {useTranslation} from "react-i18next";
import { CURRENCY_TO_COUNTRY } from '../helpers/codes';
import useForexTable, { HEADERS, DESC, ASC, CHART_HEIGHT,CHART_WIDTH } from './forex/useForexTable';
import ForexAlerts from './forex/ForexAlerts';
import ForexControls from './forex/ForexControls';

const HEADER_TITLES = {
    Name: "Name",
    Rate: "Last price",
    Change: "24h change"
}
const DEFAULT_API_KEY = "addLKpYqsBsjyFywGouY6F9R2WmQ97MS";

function ForexTable() {

    const [sortDirection, setSortDirection] = useState(DESC);
    const [sortHeader, setSortHeader] = useState(HEADERS[0]);
    const [ filters, setFilters ] = useState([]);
    const [ demo, setDemo ] = useState(false);
    const [ mock, setMock ] = useState(true);
    const [ apiKey, setApiKey ] = useState(DEFAULT_API_KEY);
    const { t } = useTranslation();

    const { error, setError, data } = useForexTable({ sortDirection, sortHeader, filters, mock, apiKey });

    const sort = header => {
        setSortDirection( sortHeader !== header ? DESC : (sortDirection === DESC ? ASC : DESC) );
        setSortHeader(header);
    }
    const changeFilter = (event, value) => setFilters(value);
    const onTrade = () => setDemo(true);
    const onChangeMockMode = (event) => { setError(false); setMock(event.target.checked); }
    const onChangeApiKey = (event) => { setError(false); setApiKey(event.target.value); }

    return (
        <Paper >
            <ForexAlerts error={error} mock={mock} demo={demo} setDemo={setDemo}/>
            <ForexControls filters={filters} changeFilter={changeFilter} mock={mock} onChangeMockMode={onChangeMockMode} apiKey={apiKey} onChangeApiKey={onChangeApiKey}/>
            {
                !error && data.length ? (<Table>
                    <TableHead>
                        <TableRow>
                            {HEADERS.map(header => (
                                <TableCell align="left">
                                    <TableSortLabel
                                        IconComponent={(sortHeader === header && sortDirection === ASC) ? ArrowDropDownIcon : ArrowDropUpIcon}
                                        direction={sortDirection}
                                        active={sortHeader === header}
                                        onClick={() => sort(header)}
                                        sx={{fontWeight: 'bold'}}
                                    >
                                        {t(HEADER_TITLES[header]) || " "}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    <span style={{fontSize: '2rem'}}
                                          className={"fi fi-" + CURRENCY_TO_COUNTRY[row.from]}></span>
                                    <span style={{fontSize: '2rem', marginLeft: '-10px', paddingBottom: '10px'}}
                                          className={"fi_flags_overlap fi fi-" + CURRENCY_TO_COUNTRY[row.to]}></span>
                                    {row.from}/{row.to}
                                </TableCell>
                                <TableCell>{row.current}</TableCell>
                                <TableCell
                                    sx={{color: row.change >= 0 ? 'lightskyblue' : 'lightcoral'}}>{row.change >= 0 ? '+' : ''}{row.change}</TableCell>
                                <TableCell>
                                    <svg id="chart" width={CHART_WIDTH} height={CHART_HEIGHT}
                                         viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path stroke="lightskyblue" fill="#efefff" d={row.chartPath}></path>
                                    </svg>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={onTrade} color="primary" variant="outlined">{t('Trade')}</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>)
                : <Alert severity="info">{t('No data to display.')}</Alert>
            }
        </Paper>
    );
}
export default ForexTable
