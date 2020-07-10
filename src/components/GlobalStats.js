import React, { useState, useEffect } from 'react'
import { Grid, Card, CardContent, Typography, makeStyles } from '@material-ui/core'
import LineChart from './LineChart';

const useStyles = makeStyles({
    card: {
        position: `relative`,
        alignItems: `center`,
        display: `flex`,
        justifyContent: `center`,
        backgroundColor: `mintcream`
    },
    cardContent: {
        display: `flex`, 
        alignItems: `center`, 
        flexDirection: `column`
    }
});

export default function GlobalStats() {
    const classes = useStyles();
    const [globalData, setGlobalData] = useState()
    const [dataLoading, setDataLoading] = useState(false)

    useEffect( () => {
        async function fetchGlobalData() {
            setDataLoading(true)
            const apiResponse = await fetch('https://api-corona.azurewebsites.net/graphql', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: `
                        query {
                            summary {
                                globalData {
                                Deaths
                                Confirmed
                                Recovered
                                Active
                                Last_Update
                                }
                            }
                        }
                    `
                })
            })
            const apiData = await apiResponse.json()
            console.log("GlobalApi", apiData)
            setGlobalData(apiData)
            setDataLoading(false)
        }
        fetchGlobalData()
    }, [setGlobalData])

    return (
        <>
        <br/>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography variant="caption2">Infected</Typography>
                            <Typography style={{color: `blue`}} variant="h6">
                                {dataLoading? "Loading" : globalData && globalData.data && globalData.data.summary.globalData.Confirmed}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography variant="caption2">Active</Typography>
                            <Typography style={{color: `darkOrange`}} variant="h6">
                                {dataLoading? "Loading" : globalData && globalData.data && globalData.data.summary.globalData.Active}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                        <Typography variant="caption2">Recovered</Typography>
                        <Typography style={{color: `green`}} variant="h6">
                            {dataLoading? "Loading" : globalData && globalData.data && globalData.data.summary.globalData.Recovered}
                        </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                        <Typography variant="caption2">Deaths</Typography>
                        <Typography style={{color: `red`}} variant="h6">
                            {dataLoading? "Loading" : globalData && globalData.data && globalData.data.summary.globalData.Deaths}
                        </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>   
            <LineChart /> 
        
        </>
    )
}
