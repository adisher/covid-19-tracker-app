import React, { useState, useEffect } from 'react'
import { makeStyles, NativeSelect, FormControl, Card } from '@material-ui/core';
import CountryStats from './CountryStats'

const useStyles = makeStyles({
    select: {
        borderRadius: "0 0 5px 5px",
        padding: "10px 40%"
    },
});

export default function CountryPicker() {
    const classes = useStyles()
    const [countryData, setCountryData] = useState()

    useEffect( () => {
        async function fetchCountryData() {
            const apiResponse = await fetch('https://api-corona.azurewebsites.net/graphql', 
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: `
                        query {
                            summary {
                                countries {
                                Country_Region
                                Code
                                }
                            }
                        }
                    `
                })
            })
            const apiData = await apiResponse.json()
            console.log("dataApi", apiData)
            setCountryData(apiData)
        }
        
        fetchCountryData()
    }, [setCountryData])

    const [countryCode, setCountryCode] = useState('US')

    const handleChange = (event) => {
      console.log("setCountry", event.target.value)
        setCountryCode(event.target.value);
    };

    return ( 
        <>
        <Card className={classes.select}>
            <FormControl>
                <NativeSelect
                    value={countryCode}
                    {...console.log(countryCode)}
                    onChange={handleChange}
                    inputProps={{
                        name: 'country',
                        id: 'Select Country',
                    }}
                    >
                    <option aria-label="None" value="" />
                    {countryData && countryData.data && countryData.data.summary.countries.map( 
                        (countries, i) => <option key={i} value={countries.Code}>{countries.Country_Region}</option>
                    )}
                </NativeSelect>
            </FormControl>
        </Card>
        
        <br/>
        <CountryStats countryCode={countryCode} />
        </>
    )
}
