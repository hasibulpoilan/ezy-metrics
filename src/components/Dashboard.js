// src/components/Dashboard.js
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import './Dashboard.css';


const Dashboard = () => {
  const [widgets, setWidgets] = useState([
    { id: 1, name: 'Sales Overview' },
    { id: 2, name: 'Leads Generated' },
  ]);

  const removeWidget = (id) => {
    setWidgets(widgets.filter((widget) => widget.id !== id));
  };

  const addWidget = () => {
    const newWidget = { id: widgets.length + 1, name: `New Widget ${widgets.length + 1}` };
    setWidgets([...widgets, newWidget]);
  };

  const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [300, 500, 400, 700, 800, 1000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <button onClick={addWidget} className="add-widget-btn">Add Widget</button>
      <div className="widgets-container">
        {widgets.map((widget) => (
          <div key={widget.id} className="widget">
            <h2>{widget.name}</h2>
            {widget.name === 'Sales Overview' && <Bar data={salesData} />}
            <button onClick={() => removeWidget(widget.id)} className="remove-widget-btn">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
