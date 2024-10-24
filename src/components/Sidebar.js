
import React from 'react';
import { NavLink } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>EzyMetrics</h2>
      <ul>
        <li>
          <NavLink to="/" end activeClassName="active-link">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/leads" activeClassName="active-link">
            Leads
          </NavLink>
        </li>
        <li>
          <NavLink to="/analytics" activeClassName="active-link">
            Analytics
          </NavLink>
        </li>
        <li>
          <NavLink to="/reports" activeClassName="active-link">
            Reports
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
