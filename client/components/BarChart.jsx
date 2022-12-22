import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';


function BarChart() {
  
  const state = {
    labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri'],
    datasets: [
      {
        label: 'Rainfall',
        data: [65, 45, 123, 42, 44]
      }
    ]
  }

  return (
    <div>
      <Bar data={state} className='chart'/>
    </div>

  )
}

export default BarChart;
