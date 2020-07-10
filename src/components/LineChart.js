import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

export default function LineChart() {
    const [globalData, setGlobalData] = useState([])
    const [dataLoading, setDataLoading] = useState()

    useEffect( () => {
        async function fetchCountryData() {
            setDataLoading(true)
            const apiResponse = await fetch('https://covid19.mathdro.id/api/daily')
            const apiData = await apiResponse.json()
            
            const modData = await apiData.map( (data) => ({
                confirmed: data.confirmed.total,
                deaths: data.deaths.total,
                date: data.reportDate
            }))
            setGlobalData(modData)
            console.log("apiData", apiData)
            setDataLoading(false)
        }
        
        fetchCountryData()
    }, [setGlobalData])

    console.log(globalData, "global")

    const lineChart = (
        globalData[0] ? (
          <Line
            data={{
              labels: globalData.map(({ date }) => date),
              datasets: [{
                data: globalData.map((data) => data.confirmed),
                label: 'Infected',
                borderColor: 'blue',
                fill: true,
              }, {
                data: globalData.map((data) => data.deaths),
                label: 'Deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                fill: true,
              },
              ],
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
            }}
          />
        ) : null
      );

    return (
        <>
            <div style={{
                marginTop: `5rem`
            }}>
                {lineChart}
            </div>
        </>
    )
}
