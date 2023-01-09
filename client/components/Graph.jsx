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





export function LineGraph(props) {
  function organizeDate(num, arr) {
    const date = new Date(num);
    const monthNum = date.getMonth();
  
    if (monthNum === 0) arr[0]++;
    if (monthNum === 1) arr[1]++;
    if (monthNum === 2) arr[2]++;
    if (monthNum === 3) arr[3]++;
    if (monthNum === 4) arr[4]++;
    if (monthNum === 5) arr[5]++;
    if (monthNum === 6) arr[6]++;
    if (monthNum === 7) arr[7]++;
    if (monthNum === 8) arr[8]++;
    if (monthNum === 9) arr[9]++;
    if (monthNum === 10) arr[10]++;
    if (monthNum === 11) arr[11]++;
  
    return arr;
  }

  const lineGraphData = (fetchedData) => {
    let depthArr = [0,0,0,0,0,0,0,0,0,0,0,0];
    let costArr = [0,0,0,0,0,0,0,0,0,0,0,0];
    let rateArr = [0,0,0,0,0,0,0,0,0,0,0,0];
    let test1 = [0];
    let test2 = [0];
    let test3 = [0];

    console.log(fetchedData);
    fetchedData.queries.forEach(query => {
      if (query.rejected_by === 'depth_limiter') {
        // depthArr = organizeDate(fetchedData.queries.rejected_on, depthArr);
        test1[0] ++;
      }
      if (query.rejected_by === 'cost_limiter') {
        // costArr = organizeDate(fetchedData.queries.rejected_on, costArr);
        test2[0] ++;
      };
      if (query.rejected_by === 'rate_limiter') {
        // rateArr = organizeDate(fetchedData.queries.rejected_on, rateArr);
        test3[0] ++;
      };

    });
    
    // return [depthArr, costArr, rateArr];
    return [test1, test2, test3];

  };
  



  const data = {
    labels,
    datasets: [
      {
        label: 'Depth Limiter',
        data: lineGraphData(props.queryData)[0],
        borderColor: depthLimiterColor.border,
        backgroundColor: depthLimiterColor.background,
        yAxisID: 'y',
      },
      {
        label: 'Rate Limiter',
        data: lineGraphData(props.queryData)[1],
        borderColor: rateLimiterColor.border,
        backgroundColor: rateLimiterColor.background,
        yAxisID: 'y1',
      },
      {
        label: 'Cost Limiter',
        data: lineGraphData(props.queryData)[2],
        borderColor: costLimiterColor.border,
        backgroundColor: costLimiterColor.background,
        yAxisID: 'y1',
      },
    ],
  };


  return <Line className='Graph' options={options} data={data} />;
}
