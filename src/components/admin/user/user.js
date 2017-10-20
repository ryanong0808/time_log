import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchEditUser } from '../../../actions/user';

import UserItem from './user-item';

class User extends Component {
  constructor(props) {
    super(props);

    const { params, fetchEditUser } = this.props;
    // Fetch user info
    fetchEditUser(params.userId);
  }


  renderUser() {
    if (this.props.user._id) {
      console.log(this.props);
      return (
        <UserItem
            key={this.props.user._id}
            userId={this.props.user._id}
            firstName={this.props.user.profile.firstName}
            lastName={this.props.user.profile.lastName}
            role={this.props.user.role}
            email={this.props.user.email}
          />
      );
    }
  }

  render() {
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-body">
            {this.renderUser()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.edit_user,
  };
}

export default connect(mapStateToProps, { fetchEditUser })(User);
