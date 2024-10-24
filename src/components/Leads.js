import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf'; 
import './Leads.css';


const Leads = () => {
  const [leads, setLeads] = useState(() => {
    const savedLeads = localStorage.getItem('leads');
    return savedLeads ? JSON.parse(savedLeads) : [
      { id: 1, name: 'John Doe', email: 'john@example.com', status: 'New' }
    ];
  });

  const [editingLead, setEditingLead] = useState(null);
  const [formData, setFormData] = useState({ id: '', name: '', email: '', status: '' });
  const [sortConfig, setSortConfig] = useState(null);
  const [filterStatus, setFilterStatus] = useState(''); 

  useEffect(() => {
    localStorage.setItem('leads', JSON.stringify(leads));
  }, [leads]);

  const startEditing = (lead) => {
    setEditingLead(lead.id);
    setFormData(lead);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLeads(leads.map(lead => lead.id === formData.id ? formData : lead));
    setEditingLead(null);
  };

  const sortLeads = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedLeads = [...leads].sort((a, b) => {
    if (sortConfig !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const filteredLeads = filterStatus ? sortedLeads.filter(lead => lead.status === filterStatus) : sortedLeads;

  const downloadPDF = () => {
    const doc = new jsPDF();
  
    doc.text('Leads Report', 20, 10);
  
    leads.forEach((lead, index) => {
      doc.text(`ID: ${lead.id}`, 20, 20 + index * 10);
      doc.text(`Name: ${lead.name}`, 20, 30 + index * 10);
      doc.text(`Email: ${lead.email}`, 20, 40 + index * 10);
      doc.text(`Status: ${lead.status}`, 20, 50 + index * 10);
    });
  
    doc.save('leads-report.pdf');
  };

  return (
    <div className="leads">
      <h1>Leads Management</h1>

      <div className="filter-sort">
        <label>
          Filter by Status:
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Closed">Closed</option>
          </select>
        </label>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th onClick={() => sortLeads('name')}>Name</th>
            <th onClick={() => sortLeads('email')}>Email</th>
            <th onClick={() => sortLeads('status')}>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.id}</td>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.status}</td>
              <td>
                <button onClick={() => startEditing(lead)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingLead && (
        <form onSubmit={handleSubmit}>
          <h2>Edit Lead</h2>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Closed">Closed</option>
          </select>
          <button type="submit">Update Lead</button>
        </form>
      )}

      <div className="export-buttons">
        <button onClick={}>Download CSV</button>
        <button onClick={downloadPDF}>Download PDF</button> {}
      </div>
    </div>
  );
};

export default Leads;
