                                                          // src/components/LeadManagement.js
import React, { useState } from 'react';

const LeadManagement = () => {
  const [leads, setLeads] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'New' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Contacted' }
  ]);

  const [newLead, setNewLead] = useState({ name: '', email: '', status: '' });
  const [editing, setEditing] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLead({ ...newLead, [name]: value });
  };

  const addLead = () => {
    if (newLead.name && newLead.email && newLead.status) {
      setLeads([...leads, { id: leads.length + 1, ...newLead }]);
      setNewLead({ name: '', email: '', status: '' });
    }
  };

  const deleteLead = (id) => {
    setLeads(leads.filter(lead => lead.id !== id));
  };

  const startEditing = (lead) => {
    setNewLead(lead);
    setEditing(lead.id);
  };

  const editLead = () => {
    setLeads(
      leads.map(lead => (lead.id === editing ? { ...lead, ...newLead } : lead))
    );
    setNewLead({ name: '', email: '', status: '' });
    setEditing(null);
  };

  return (
    <div className="lead-management">
      <h1>Lead Management</h1>
      <div className="lead-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newLead.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newLead.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={newLead.status}
          onChange={handleInputChange}
        />
        {editing ? (
          <button onClick={editLead}>Edit Lead</button>
        ) : (
          <button onClick={addLead}>Add Lead</button>
        )}
      </div>

      <div className="lead-list">
        <h2>Lead List</h2>
        {leads.length === 0 ? (
          <p>No leads available.</p>
        ) : (
          leads.map(lead => (
            <div key={lead.id} className="lead-item">
              <span>{lead.name}</span>
              <span>{lead.email}</span>
              <span>{lead.status}</span>
              <button onClick={() => startEditing(lead)}>Edit</button>
              <button onClick={() => deleteLead(lead.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeadManagement;     