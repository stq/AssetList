import {FormControlLabel, Input, Stack, Switch, ToggleButtonGroup} from "@mui/material";
import RoundToggleButton from "../common/RoundToggleButton";
import {FILTER_MAJOR, FILTER_MINOR, FILTER_SMARTFX} from "./useForexTable";
import React from "react";
import {useTranslation} from "react-i18next";

const ForexControls = ({filters, changeFilter, mock, onChangeMockMode, apiKey, onChangeApiKey}) => {
    const { t } = useTranslation();

    const validateApiKey = event => {
        if( event.target.value.length === 32 ) onChangeApiKey(event);
        return true;
    }

    return  <Stack direction="row"  justifyContent="space-between" alignItems="center">
        <ToggleButtonGroup sx={{ m: "1rem 0"}} value={filters} onChange={changeFilter}>
            <RoundToggleButton value={FILTER_MAJOR}>Major pairs</RoundToggleButton>
            <RoundToggleButton value={FILTER_MINOR}>Minor pairs</RoundToggleButton>
            <RoundToggleButton value={FILTER_SMARTFX}>Smart FX</RoundToggleButton>
        </ToggleButtonGroup>
        {!mock && <FormControlLabel labelPlacement="start" control={<Input color="secondary" defaultValue={apiKey} onChange={validateApiKey}></Input>} label={t('Fixer API Key:')} />}
        <FormControlLabel control={<Switch defaultChecked color="secondary" onChange={onChangeMockMode}/>} label={t('Use mock Fixer API response')} />
    </Stack>;

}

export default ForexControls;