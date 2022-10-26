import {useTranslation} from "react-i18next";
import {Alert, Paper} from "@mui/material";
import React from "react";

const DemoMessage = ({name}) => {
    const { t } = useTranslation();
    return <Paper sx={{p: "2rem"}}>
        <Alert sx={{m: "1rem"}} severity="info"><b>{t(name)}</b> {t('not implemented in this version')}</Alert>
    </Paper>;
}
export default DemoMessage;