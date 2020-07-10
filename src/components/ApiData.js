import React from 'react'
import GlobalStats from './GlobalStats'
import CountryStats from './CountryPicker'


export default function ApiData({currentScreen}) {
    
    if (currentScreen === 0) {
        return <GlobalStats/>
    }
    else if(currentScreen === 1) {
        return <CountryStats/>
    }
    else return <GlobalStats/>
}
