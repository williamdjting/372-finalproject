import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';


export default function StockInfoContainer(props) {
  
  const renderChart = (
    <AreaChart
      width={1150}
      height={450}
      data={props.rangeData}
      margin={{top: 0, right: 50, left: 80, bottom: 5}}
      >
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