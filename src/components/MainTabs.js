import React, {useState} from 'react';
import {Tab, Tabs, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import {Router, navigate} from "@gatsbyjs/reach-router"
import ForexTable from "./ForexTable";
import { useTranslation } from 'react-i18next';
import DemoMessage from "./forex/DemoMessage"

const WideTabs = styled(Tabs)`
    margin-top: 1rem;
`
const MainTabs = ({path}) => {

    const [tab, setTab] = useState(path);
    const { t } = useTranslation();

    const onTabChange = (event, value) => {
        setTab(value);
        navigate(value)
    };

    return <Paper>
        <WideTabs variant="fullWidth" value={tab} onChange={onTabChange}
              indicatorColor="secondary" textColor="primary" centered sx={{width: 1, minWidth: 750,}}>
            <Tab label={t("Forex")}  value="/" default></Tab>
            <Tab label={t("Synthetic indices")} value="/synth"/>
            <Tab label={t("Stock indices")} value="/stock"/>
            <Tab label={t("Cryptocurrencies")}  value="/crypto"/>
            <Tab label={t("Commodities")}  value="/commodities"/>
        </WideTabs>
        <Router basepath="/">
            <ForexTable default path="/"/>
            <DemoMessage path="/synth" name="Synthetic indices"/>
            <DemoMessage path="/stock" name="Stock indices"/>
            <DemoMessage path="/crypto" name="Cryptocurrencies"/>
            <DemoMessage path="/commodities" name="Commodities"/>
        </Router>
    </Paper>;
}
export default MainTabs;