import React, { Component } from 'react';
import { Link } from 'react-router';

class AdminDashboard extends Component {
  render() {
    return (
      <div>
        <Link to={`/admin/user`}>Manage Users</Link>
      </div>
    );
  }
}

export default AdminDashboard;
