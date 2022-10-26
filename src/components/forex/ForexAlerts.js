import {Alert, Snackbar} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";

const ForexAlerts = ({error, mock, demo, setDemo}) => {
    const { t } = useTranslation();

    return <>
        <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            open={error}>
            <Alert severity="error">{t('Error: Forex API error (Hint: try another API key).')}</Alert>
        </Snackbar>
        <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            open={mock}>
            <Alert severity="warning">{t('Warning: this table is using mock data.')}</Alert>
        </Snackbar>
        <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            open={demo}
            autoHideDuration={3000}
            onClose={() => setDemo(false)}>
            <Alert severity="warning">{t('Trade function is not implemented in this version.')}</Alert>
        </Snackbar>
    </>
}

export default ForexAlerts;