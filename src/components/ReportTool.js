import React, { useState } from 'react';
import jsPDF from 'jspdf';

const ReportTool = () => {
  const [reportType, setReportType] = useState('pdf');
  const [leads, setLeads] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'New' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Contacted' }
  ]);


  const [newLead, setNewLead] = useState({ id: '', name: '', email: '', status: '' });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLead({ ...newLead, [name]: value });
  };


  const handleAddLead = () => {
    if (newLead.id && newLead.name && newLead.email && newLead.status) {
      setLeads((prevLeads) => [...prevLeads, newLead]); 
      setNewLead({ id: '', name: '', email: '', status: '' }); 
    } else {
      alert("Please fill out all fields");
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Lead Report", 10, 10);
    leads.forEach((lead, index) => {
      doc.text(`${index + 1}. ${lead.name} - ${lead.email} - ${lead.status}`, 10, 20 + index * 10);
    });
    doc.save("leads_report.pdf");
  };

  const downloadCSV = () => {
    const csvData = [
      ["ID", "Name", "Email", "Status"],
      ...leads.map(lead => [lead.id, lead.name, lead.email, lead.status])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'leads_report.csv');
    a.click();
  };

  const generateReport = () => {
    if (reportType === 'pdf') {
      downloadPDF();
    } else if (reportType === 'csv') {
      downloadCSV();
    }
  };

  return (
    <div className="report-tool">
      <h2>Generate Report</h2>

   
      <div className="lead-form">
        <h3>Add New Lead</h3>
        <input
          type="text"
          name="id"
          value={newLead.id}
          onChange={handleInputChange}
          placeholder="ID"
        />
        <input
          type="text"
          name="name"
          value={newLead.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={newLead.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="status"
          value={newLead.status}
          onChange={handleInputChange}
          placeholder="Status"
        />
        <button onClick={handleAddLead}>Add Lead</button>
      </div>

      <div className="report-options">
        <label>
          <input
            type="radio"
            name="reportType"
            value="pdf"
            checked={reportType === 'pdf'}
            onChange={(e) => setReportType(e.target.value)}
          />
          PDF
        </label>
        <label>
          <input
            type="radio"
            name="reportType"
            value="csv"
            checked={reportType === 'csv'}
            onChange={(e) => setReportType(e.target.value)}
          />
          CSV
        </label>
      </div>
      
      <button onClick={generateReport}>Download Report</button>

      <div>
        <h3>Lead Report</h3>
        <ul>
          {leads.map((lead, index) => (
            <li key={index}>{`${lead.name} - ${lead.email} - ${lead.status}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReportTool;
