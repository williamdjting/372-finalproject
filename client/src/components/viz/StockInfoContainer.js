import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

//TODO: 1) dynamically populate stock prices using time series format
// 2) create a dynamically generated list of user stock options with PERatio, Marketcap
// 3) dynamically switch between charts when a listitem has been pressed
export default function StockInfoContainer(props) {
  //hard coded date
  const rangeData = [
    {
      "day": "05-01",
      "stockPrice": 
        10
      
    },
    {
      "day": "05-02",
      "stockPrice": 
        15
      
    },
    {
      "day": "05-03",
      "stockPrice": 
        12
      
    },
    {
      "day": "05-04",
      "stockPrice": 
        12
      
    },
    {
      "day": "05-05",
      "stockPrice": 
        16
      
    },
    {
      "day": "05-06",
      "stockPrice": 
        16
      
    },
    {
      "day": "05-07",
      "stockPrice": 
        12
      
    },
    {
      "day": "05-08",
      "stockPrice": 
        8
      
    },
    {
      "day": "05-09",
      "stockPrice": 
        5
    }
  ]
  
  const renderChart = (
    <AreaChart
      width={1030}
      height={450}
      data={props.rangeData}>
      <XAxis dataKey={props.xdataKey} />
      <YAxis />
      <Area dataKey={props.ydataKey} stroke="#8884d8" fill="#8884d8" />
      <Tooltip />
  </AreaChart>
  );

    return (
      <React.Fragment>
        {renderChart}
    </React.Fragment>
    );  
  }