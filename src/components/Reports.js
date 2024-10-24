
import React, { useState } from 'react';
import ReportTool from './ReportTool';



const Reports = () => {
  const [reportHistory, setReportHistory] = useState([]);

  const handleReportGeneration = (type) => {
    const newReport = {
      id: reportHistory.length + 1,
      type,
      date: new Date().toLocaleString()
    };
    setReportHistory([...reportHistory, newReport]);
  };

  return (
    <div className="reports">
      <h1>Reports</h1>
      <ReportTool onGenerate={handleReportGeneration} />
      <div className="report-history">
        <h2>Report History</h2>
        {reportHistory.length === 0 ? (
          <p>No reports generated yet.</p>
        ) : (
          <ul>
            {reportHistory.map(report => (
              <li key={report.id}>
                {report.type.toUpperCase()} Report - Generated on {report.date}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Reports;
