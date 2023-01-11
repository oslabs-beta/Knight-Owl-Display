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
    y1: {
      type: 'linear',
      display: true,
      position: 'left',
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
        
      //   const monthNum = date.getMonth();

      
      //   if (monthNum === 0) depthArr[0]++;
      //   if (monthNum === 1) depthArr[1]++;
      //   if (monthNum === 2) depthArr[2]++;
      //   if (monthNum === 3) depthArr[3]++;
      //   if (monthNum === 4) depthArr[4]++;
      //   if (monthNum === 5) depthArr[5]++;
      //   if (monthNum === 6) depthArr[6]++;
      //   if (monthNum === 7) depthArr[7]++;
      //   if (monthNum === 8) depthArr[8]++;
      //   if (monthNum === 9) depthArr[9]++;
      //   if (monthNum === 10) depthArr[10]++;
      //   if (monthNum === 11) depthArr[11]++;
       
      }
      if (query.rejected_by === 'cost_limiter') {
        if (position !== null) {
          costArr[position]++;
        }
      //   const date = new Date(Number(query.rejected_on));
      //   const monthNum = date.getMonth();
      
      //   if (monthNum === 0) costArr[0]++;
      //   if (monthNum === 1) costArr[1]++;
      //   if (monthNum === 2) costArr[2]++;
      //   if (monthNum === 3) costArr[3]++;
      //   if (monthNum === 4) costArr[4]++;
      //   if (monthNum === 5) costArr[5]++;
      //   if (monthNum === 6) costArr[6]++;
      //   if (monthNum === 7) costArr[7]++;
      //   if (monthNum === 8) costArr[8]++;
      //   if (monthNum === 9) costArr[9]++;
      //   if (monthNum === 10) costArr[10]++;
      //   if (monthNum === 11) costArr[11]++;
        
      };
      if (query.rejected_by === 'rate_limiter') {
        if (position !== null) {
          rateArr[position]++;
        }
      //   const date = new Date(Number(query.rejected_on));
      //   const monthNum = date.getMonth();
      
      //   if (monthNum === 0) rateArr[0]++;
      //   if (monthNum === 1) rateArr[1]++;
      //   if (monthNum === 2) rateArr[2]++;
      //   if (monthNum === 3) rateArr[3]++;
      //   if (monthNum === 4) rateArr[4]++;
      //   if (monthNum === 5) rateArr[5]++;
      //   if (monthNum === 6) rateArr[6]++;
      //   if (monthNum === 7) rateArr[7]++;
      //   if (monthNum === 8) rateArr[8]++;
      //   if (monthNum === 9) rateArr[9]++;
      //   if (monthNum === 10) rateArr[10]++;
      //   if (monthNum === 11) rateArr[11]++;
        
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
        yAxisID: 'y1',
      },
      {
        label: 'Rate Limiter',
        data: LineGraphData(props.queryData)[1],
        borderColor: rateLimiterColor.border,
        backgroundColor: rateLimiterColor.background,
        yAxisID: 'y1',
      },
      {
        label: 'Cost Limiter',
        data: LineGraphData(props.queryData)[2],
        borderColor: costLimiterColor.border,
        backgroundColor: costLimiterColor.background,
        yAxisID: 'y1',
      },
    ],
  };

  return <Line className='chart' data={data} options={options} />;
}
