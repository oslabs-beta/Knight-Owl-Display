import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

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

export const data = {
  labels: ['Depth Limiter', 'Cost Limiter', 'Rate Limiter'],
  datasets: [
    {
      label: 'Bounced Queries by Limiter',
      // Placeholder data
      data: [3, 3, 3],
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

export function PieChart() {
  return <Pie className='Graph' data={data} />;
}
