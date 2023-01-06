import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Queries Over Time',
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
    y1: {
      type: 'linear',
      display: false,
      position: 'right',
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const depthLimiterColor = {
  // Currently Green
  background: 'rgba(75, 192, 192, 0.2)',
  border: 'rgba(75, 192, 192, 1)',
};


const rateLimiterColor =  {
  // Currently Blue
  background: 'rgba(255, 99, 132, 0.2)',
  border: 'rgba(255, 99, 132, 1)',
};

const costLimiterColor = {
  // Currently Red
  background: 'rgba(54, 162, 235, 0.2)',
  border: 'rgba(54, 162, 235, 1)',
};

// Placeholder Data for Charts

const randomArrayPopulate = (numEl) => {
  const arr = [];
  for(let i = 0; i < numEl; i++) {
    const randomNum = Math.ceil(Math.random()*1000);
    arr.push(randomNum);
  }
  return arr;
}

const depthArr = randomArrayPopulate(12);
const costArr = randomArrayPopulate(12);
const rateArr = randomArrayPopulate(12);


export const data = {
  labels,
  datasets: [
    {
      label: 'Depth Limiter',
      data: depthArr,
      borderColor: depthLimiterColor.border,
      backgroundColor: depthLimiterColor.background,
      yAxisID: 'y',
    },
    {
      label: 'Rate Limiter',
      data: costArr,
      borderColor: rateLimiterColor.border,
      backgroundColor: rateLimiterColor.background,
      yAxisID: 'y1',
    },
    {
      label: 'Cost Limiter',
      data: rateArr,
      borderColor: costLimiterColor.border,
      backgroundColor: costLimiterColor.background,
      yAxisID: 'y1',
    },
  ],
};

export function LineGraph() {
  return <Line className='Graph' options={options} data={data} />;
}
