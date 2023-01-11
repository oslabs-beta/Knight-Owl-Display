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
  layout: {
    padding: 20
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
// labels for 12-month view; changing to 30-day view
// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Days in each month from January to December 
const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

// get current date to establish labels of past 30 days
let today = new Date();
// add day to Feb if leap year
if (today.getFullYear() % 4 === 0) monthLengths[1]++;
// grab current date and month for labels
let currentDate = today.getDate();
let currentMonth = today.getMonth();
const labels = new Array(30);
const positions = {};

for (let i = 29; i >= 0; i--) {
  if (currentDate === 0) {
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    currentDate = monthLengths[currentMonth];
  }

  labels[i] = `${currentMonth + 1}/${currentDate}`
  positions[labels[i]] = i;
  currentDate--;
}

const depthLimiterColor = {
  // Currently Green
  background: 'rgba(75, 192, 192, 0.2)',
  border: 'rgba(75, 192, 192, 1)',
};


const rateLimiterColor =  {
  // Currently Blue
  background: 'rgba(54, 162, 235, 0.2)',
  border: 'rgba(54, 162, 235, 1)',
};

const costLimiterColor = {
  // Currently Red
  background: 'rgba(255, 99, 132, 0.2)',
  border: 'rgba(255, 99, 132, 1)',
};

export function LineGraph(props) {
  const LineGraphData = (fetchedData) => {
    const depthArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const costArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const rateArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


    fetchedData.queries.forEach(query => {

      const date = new Date(Number(query.rejected_on));
      const dateNum = date.getDate();
      let monthNum = date.getMonth() + 1;
      const position = positions.hasOwnProperty(`${monthNum}/${dateNum}`) ? positions[`${monthNum}/${dateNum}`] : null;

      if (query.rejected_by === 'depth_limiter') {
        if (position !== null) {
          depthArr[position]++
        }
      }
      if (query.rejected_by === 'cost_limiter') {
        if (position !== null) {
          costArr[position]++;
        }        
      };
      if (query.rejected_by === 'rate_limiter') {
        if (position !== null) {
          rateArr[position]++;
        }
      };

    });
    return [depthArr, rateArr, costArr];
  };
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Depth Limiter',
        data: LineGraphData(props.queryData)[0],
        borderColor: depthLimiterColor.border,
        backgroundColor: depthLimiterColor.background,
        yAxisID: 'y',
      },
      {
        label: 'Rate Limiter',
        data: LineGraphData(props.queryData)[1],
        borderColor: rateLimiterColor.border,
        backgroundColor: rateLimiterColor.background,
        yAxisID: 'y',
      },
      {
        label: 'Cost Limiter',
        data: LineGraphData(props.queryData)[2],
        borderColor: costLimiterColor.border,
        backgroundColor: costLimiterColor.background,
        yAxisID: 'y',
      },
    ],
  };

  return <Line className='chart' options={options} data={data} />;
}
