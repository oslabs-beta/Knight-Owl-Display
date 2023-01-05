import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const depthLimiterColor = {
  // Currently Green
  primary: 'rgba(75, 192, 192, 0.2)',
  secondary: 'rgba(75, 192, 192, 1)',
};


const rateLimiterColor =  {
  // Currently Blue
  primary: 'rgba(255, 99, 132, 0.2)',
  secondary: 'rgba(255, 99, 132, 1)',
};

const costLimiterColor = {
  // Currently Red
  primary: 'rgba(54, 162, 235, 0.2)',
  secondary: 'rgba(54, 162, 235, 1)',
}

export const data = {
  labels: ['Depth Limiter', 'Cost Limiter', 'Rate Limiter'],
  datasets: [
    {
      label: 'Bounced Queries by Limiter',
      // Placeholder data
      data: [3, 3, 3],
      backgroundColor: [
        depthLimiterColor.primary,
        rateLimiterColor.primary,
        costLimiterColor.primary,
        
      ],
      borderColor: [
        depthLimiterColor.secondary,
        rateLimiterColor.secondary,
        costLimiterColor.secondary,
      ],
      borderWidth: 1,
    },
  ],
};

export function PieChart() {
  return <Pie className='Graph' data={data} />;
}
