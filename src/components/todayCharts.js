import React from 'react';
import {Line} from 'react-chartjs-2'

const Charts = (props) => {
  let currency = props.currency
  let labels = [];
  let variations = [];

  props.data.forEach( element => {
    variations.push(element[currency].variation)
    labels.push(element[currency].buy.toFixed(2))
  })

  const data = {
    labels: labels,
    datasets: [
      {
        label: props.currency,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: variations
      }
    ]
  }

  console.log('chart',props.data)
  return (
    <div className="mb-5">      
      <h3 className="m-3">Today</h3>
      <Line data={data} />
      <p className="my-3 d-flex justify-content-center">Variation hour by hour in %</p>      
    </div>  
  )
}

export default Charts