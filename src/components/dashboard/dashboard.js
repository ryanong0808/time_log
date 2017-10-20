import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import { protectedTest } from '../../actions/auth';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.props.protectedTest();
  }

  isRole(roleToCheck, toRender) {
    const userRole = cookie.load('user').role;

    if (userRole == roleToCheck) {
      return toRender;
    }

    return false;
  }

  adminMenu() {
    return (
      <div className="admin-menu">
        <Link to={`/admin/user`}>Manage Users</Link> | <Link to={`/dashboard/timelog`}>Time Log</Link> | <Link to={`/profile/edit`}>Edit Profile</Link> 
      </div>
    );
  }

  ownerMenu() {
    return (
      <div className="trainer-menu">
        <Link to={`/admin/user`}>Manage Users</Link> | <Link to={`/profile/edit`}>Edit Profile</Link> 
      </div>
    );
  }

  memberMenu() {
    return (
      <div className="member-menu">
        <Link to={`/dashboard/timelog`}>Time Log</Link> | <Link to={`/profile/edit`}>Edit Profile</Link> 
      </div>
      )
  }

  
  render() {
    return (
      <div>
        {this.isRole('Member', this.memberMenu())}
        {this.isRole('Admin', this.adminMenu())}
        {this.isRole('Owner', this.ownerMenu())}
        <p>{this.props.content}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { content: state.auth.content };
}

export default connect(mapStateToProps, { protectedTest })(Dashboard);
