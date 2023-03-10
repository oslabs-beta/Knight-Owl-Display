import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    title: {
      display: true,
      text: 'Queries By Type',
    }
  },
  layout: {
    padding: 20
  }
};

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

export function PieChart(props) {
  const pieChartCounter = (fetchedData) => {
      const counts = [0, 0, 0];
      fetchedData.queries.forEach(query => {
        if (query.rejected_by === 'depth_limiter') counts[0]++;
        if (query.rejected_by === 'rate_limiter') counts[1]++;
        if (query.rejected_by === 'cost_limiter') counts[2]++;
      })
      return counts;
    };
  
  const data = {
    labels: ['Depth Limiter', 'Rate Limiter', 'Cost Limiter'],
    datasets: [
      {
        label: 'Bounced Queries by Limiter',
        data: pieChartCounter(props.queryData),
        backgroundColor: [
          depthLimiterColor.background,
          rateLimiterColor.background,
          costLimiterColor.background,
          
        ],
        borderColor: [
          depthLimiterColor.border,
          rateLimiterColor.border,
          costLimiterColor.border,
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie className='chart' data={data} options={options} />;
}
