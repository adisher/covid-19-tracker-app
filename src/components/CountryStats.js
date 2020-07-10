import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup';
import { Grid, Card, CardContent, Typography } from '@material-ui/core'
import BarChart from './BarChart';

export default function CountryStats({countryCode}) {
    const [countryData, setCountryData] = useState('US')
    const [dataLoading, setDataLoading] = useState(false)

    useEffect( () => {
        async function fetchCountryData() {
            setDataLoading(true)
            const apiResponse = await fetch('https://api-corona.azurewebsites.net/graphql', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: `
                        query getCountry($code: ID!) {
                            country(country: $code) {
                                Summary {
                                    Country_Region
                                    Confirmed
                                    Deaths
                                    Recovered
                                    Last_Update
                                    Active
                                }
                            }
                        }
                    `,
                    variables: {code: countryCode}
                })
            })
            const apiData = await apiResponse.json()
            setCountryData(apiData)
            console.log("apiData", apiData)
            setDataLoading(false)
        }
        
        fetchCountryData()
    }, [countryCode])

    return (
        <>
        {console.log("CountryData: ", countryData)}
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography>Infected</Typography>
                            <Typography>
                                {dataLoading? "Loading" : countryData && countryData.data && countryData.data.country.Summary.Confirmed}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography>Active</Typography>
                            <Typography>
                                {dataLoading? "Loading" : countryData && countryData.data && countryData.data.country.Summary.Active}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography>Recovered</Typography>
                            <Typography>
                                {dataLoading? "Loading" : countryData && countryData.data && countryData.data.country.Summary.Recovered}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography>Deaths</Typography>
                            <Typography>
                                {dataLoading? "Loading" : countryData && countryData.data && countryData.data.country.Summary.Deaths}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <BarChart countryCode={countryCode} />
        
        </>
    )
}
