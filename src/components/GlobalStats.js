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
                        <CountUp start={0} end={dataLoading? "Loading" : globalData && globalData.data && globalData.data.summary.globalData.Confirmed} duration={2} separator=','/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                        <Typography>Active</Typography>
                        <CountUp start={0} end={dataLoading? "Loading" : globalData && globalData.data && globalData.data.summary.globalData.Active} duration={2} separator=','/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                        <Typography>Recovered</Typography>
                        <CountUp start={0} end={dataLoading? "Loading" : globalData && globalData.data && globalData.data.summary.globalData.Recovered} duration={2} separator=','/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                        <Typography>Deaths</Typography>
                        <CountUp start={0} end={dataLoading? "Loading" : globalData && globalData.data && globalData.data.summary.globalData.Deaths} duration={2} separator=','/>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>   
            <LineChart /> 
        
        </>
    )
}
