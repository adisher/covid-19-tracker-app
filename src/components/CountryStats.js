import React, { useEffect, useState } from 'react'
import { Grid, Card, CardContent, Typography, makeStyles } from '@material-ui/core'
import BarChart from './BarChart';
import CountUp from 'react-countup';

const useStyles = makeStyles({
    card: {
        position: `relative`,
        alignItems: `center`,
        display: `flex`,
        justifyContent: `center`,
        backgroundColor: `mintcream`,
    },
    cardContent: {
        display: `flex`, 
        alignItems: `center`, 
        flexDirection: `column`
    }
});

export default function CountryStats({countryCode}) {
    const classes = useStyles();
    const [countryData, setCountryData] = useState('PK')
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

    var formatter = new Intl.NumberFormat({
        style: 'text',
      });
      
    //   formatter.format(2500)
    return (
        <>
        {console.log("CountryData: ", countryData)}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography variant="caption2">Infected</Typography>
                            <Typography style={{color: `blue`}} variant="h6">
                            
                            {dataLoading? "Loading" : formatter.format(countryData && countryData.data && countryData.data.country.Summary.Confirmed)}
                             
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography variant="caption2">Active</Typography>
                            <Typography style={{color: `darkOrange`}} variant="h6">
                                {dataLoading? "Loading" : formatter.format(countryData && countryData.data && countryData.data.country.Summary.Active)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography variant="caption2">Recovered</Typography>
                            <Typography style={{color: `green`}} variant="h6">
                                {dataLoading? "Loading" : formatter.format(countryData && countryData.data && countryData.data.country.Summary.Recovered)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography variant="caption2">Deaths</Typography>
                            <Typography style={{color: `red`}} variant="h6">
                                {dataLoading? "Loading" : formatter.format(countryData && countryData.data && countryData.data.country.Summary.Deaths)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <BarChart countryCode={countryCode} />
        
        </>
    )
}
