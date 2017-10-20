import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../../actions/user';
import { Link } from 'react-router';

import UserItem from './user-item';

class UserList extends Component {
  constructor(props) {
    super(props);

  }
  componentWillMount() {
    // Fetch users
    this.props.fetchUsers();
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-3 col-sm6">
            <b>Name</b>
          </div>
          <div className="col-md-3 col-sm6">
            <b>Email</b>
          </div>
          <div className="col-md-3 col-sm6">
            <b>Role</b>
          </div>
          <div className="col-md-3 col-sm6">
            <b>Operation</b>
          </div>
        </div>
        {this.props.users.map(user => (
          <UserItem
            key={user._id}
            userId={user._id}
            firstName={user.profile.firstName}
            lastName={user.profile.lastName}
            role={user.role}
            email={user.email}
          />
        ))}
        <Link className="btn btn-primary" to="/admin/user/new">Add New User</Link>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    users: state.user.users,
  };
}

export default connect(mapStateToProps, { fetchUsers })(UserList);
