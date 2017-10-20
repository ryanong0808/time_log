import React, { Component } from 'react';

class UserInfo extends Component {
	constructor(props){
		super(props);
	}

  render() {
  	if(this.props.data){
  		return (
	      <div>
	        {this.props.data.email}
	      </div>
	    );	
  	} else {
  		return (
  			<div>Loading...</div>
  			)
  	}
  }
}

export default UserInfo;
