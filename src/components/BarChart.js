import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'

export default function BarChart({countryCode}) {
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

    const barChart = (
        countryData? (
            <Bar 
                data={{
                    labels: [`Infected`, `Active`, `Recovered`, `Deaths`],
                    datasets: [{
                        label: `People`,
                        backgroundColor: [
                            `blue`,
                            `orange`,
                            `green`,
                            `red`
                        ],
                        data: [
                            dataLoading? `loading...` : countryData && countryData.data && countryData.data.country.Summary.Confirmed,
                            dataLoading? `loading...` : countryData && countryData.data && countryData.data.country.Summary.Active, 
                            dataLoading? "Loading" : countryData && countryData.data && countryData.data.country.Summary.Recovered, 
                            dataLoading? "Loading" : countryData && countryData.data && countryData.data.country.Summary.Deaths
                        ]
                    }],
                }}
                options={{
                    scales: {
                        xAxes: [{
                            display: true,
                            
                            ticks: {
                               fontColor: `white`, // To format the ticks, coming on the axis/labels which we are passing.
                               fontSize: 14
                            }
                        }],
                        yAxes: [{
                            display: true,
                            
                            ticks: {
                               fontColor: `white`, // To format the ticks, coming on the axis/labels which we are passing.
                               fontSize: 14
                            }
                        }],
                    },
                    legend: { display: false },
                    title: { 
                        display: true, 
                        fontColor: `white`, 
                        fontSize: 24, 
                        text: `Current state in ${dataLoading? "Loading" : countryData && countryData.data && countryData.data.country.Summary.Country_Region}`
                    }
                }}
            />
        ) :null
    )

    return (
        <>
            <div style={{
                marginTop: `5rem`
            }}
            >
                {barChart} 
            </div>
             
        </>
    )
}
