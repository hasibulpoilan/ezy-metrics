
import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';



ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const Analytics = () => {
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'User Growth',
        data: [50, 60, 70, 80, 90, 100, 110],
        borderColor: '#e17055',
        backgroundColor: 'rgba(225, 112, 85, 0.5)',
        fill: true,
      },
      {
        label: 'Sales',
        data: [30, 40, 50, 60, 70, 80, 90],
        borderColor: '#00b894',
        backgroundColor: 'rgba(0, 184, 148, 0.5)',
        fill: true,
      }
    ]
  };

  const barData = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    datasets: [
      {
        label: 'Sales',
        data: [120, 90, 150, 80],
        backgroundColor: ['#00b894', '#e17055', '#0984e3', '#fdcb6e'],
      }
    ]
  };

  const pieData = {
    labels: ['Marketing', 'Sales', 'Development', 'Support'],
    datasets: [
      {
        label: 'Department Distribution',
        data: [300, 50, 100, 80],
        backgroundColor: ['#00b894', '#e17055', '#0984e3', '#fdcb6e'],
        hoverOffset: 4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Analytics Overview' }
    }
  };

  return (
    <div className="analytics">
      <h1>Analytics</h1>
      <div className="chart-container">
        <Line data={lineData} options={options} />
      </div>
      <div className="chart-container">
        <Bar data={barData} options={options} />
      </div>
      <div className="chart-container">
        <Pie data={pieData} options={options} />
      </div>
    </div>
  );
};

export default Analytics;
