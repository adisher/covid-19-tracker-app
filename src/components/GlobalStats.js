import React, { useState, useEffect } from 'react'
import CountUp from 'react-countup';
import { Grid, Card, CardContent, Typography } from '@material-ui/core'
import LineChart from './LineChart';

export default function GlobalStats() {
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
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                        <Typography>Confirmed</Typography>
                        {dataLoading? "Loading" : globalData && globalData.data && globalData.data.summary.globalData.Confirmed}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                        <Typography>Active</Typography>
                        {dataLoading? "Loading" : globalData && globalData.data && globalData.data.summary.globalData.Active}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                        <Typography>Recovered</Typography>
                        {dataLoading? "Loading" : globalData && globalData.data && globalData.data.summary.globalData.Recovered}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                        <Typography>Deaths</Typography>
                        {dataLoading? "Loading" : globalData && globalData.data && globalData.data.summary.globalData.Deaths}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>   
            <LineChart /> 
        
        </>
    )
}
