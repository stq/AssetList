import React from "react"
import { ThemeProvider } from '@mui/material/styles';
import { Location } from "@gatsbyjs/reach-router"
import SEO from "../components/system/Seo"
import MainTabs from "../components/MainTabs";
import theme from "../components/system/theme";
import "../components/system/AppGlobalStyles";

const IndexPage = () => (
    <ThemeProvider theme={theme}>
    <div>
        <SEO title="AssetList" />
        <Location>
            {({ location }) => {
                return <MainTabs path={location.pathname}/>
            }}
        </Location>
    </div>

    </ThemeProvider>
)

export default IndexPage