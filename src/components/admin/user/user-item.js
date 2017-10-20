import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';

import { deleteUser } from '../../../actions/user';

class UserItem extends Component {
  delete() {
    if(this.props.userId){
      this.props.deleteUser(this.props.userId);
    } else {
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-3 col-sm-6">
          <a href={`/admin/user/view/${this.props.userId}`}>
            <span>{this.props.firstName} {this.props.lastName}</span>
          </a>
        </div>
        <div className="col-md-3 col-sm-6">
          <span>{this.props.email}</span>
        </div>
        <div className="col-md-3 col-sm-6">
          <span>{this.props.role}</span>
        </div>
        <div className="col-md-3 col-sm-6">
          <a href={`/admin/user/edit/${this.props.userId}`}>EDIT</a> <span> | </span>
          <a onClick={this.delete.bind(this)}>DELETE</a>
        </div>     
      </div>
    );
  }
}

// export default UserItem;
function mapStateToProps(state) {
  return {
    user: state.timesheet.user,
  };
}

export default connect(mapStateToProps, { deleteUser })(UserItem);
