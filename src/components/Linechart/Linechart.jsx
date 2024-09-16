/* Linechart component made to display the chart */
import React, { useEffect } from 'react'
import { useState } from 'react'
import Chart from 'react-google-charts'

const Linechart = ({historicalData}) => {
    /* To get historical data we will pass props. For this we will mount this component on Coin page*/
    /* To store API data into data state */
    /* From historicalData we will store "date" and "price" in the data state using useEffect*/

    const [data, setData] = useState([["Date", "Prices"]])
    useEffect(() => {
        let dataCopy = [["Date", "Prices"]];
        if(historicalData.prices){
            historicalData.prices.map((item) => {
                dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`, item[1]])
            })
        } // using toLocaleDateString() will provide date as - 10/05/2024
        setData(dataCopy);     /* Providing dataCopy in setData */
    }, [historicalData])

    return (
        <Chart
        chartType='LineChart'
        data={data}
        height="100%"
        legendToggle
        />
    )
}

export default Linechart