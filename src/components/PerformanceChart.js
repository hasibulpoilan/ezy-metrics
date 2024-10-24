
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Chart } from 'chart.js/auto';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PerformanceChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Performance',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: '#0984e3',
        backgroundColor: 'rgba(9, 132, 227, 0.5)',
        fill: true,
      }
    ]
  };

  useEffect(() => {
    if (widgets.performance) {
      const ctx = document.getElementById('performanceChart');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              label: 'Performance',
              data: [65, 59, 80, 81, 56, 55],
              backgroundColor: ['rgba(75, 192, 192, 0.2)'],
              borderColor: ['rgba(75, 192, 192, 1)'],
              borderWidth: 1,
            },
          ],
        },
      });
    }
  }, [widgets.performance]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Performance Over Time' }
    }
  };

  return <Line data={data} options={options} />;
};

export default PerformanceChart;
