import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';

import { deleteTimelog } from '../../../actions/timelog';

class TimelogItem extends Component {
  delete() {
    if(this.props.timelogId){
      this.props.deleteTimelog(this.props.timelogId);
    } else {
    }
  }
  isUnderWorkingHours(){
    const preferredHours = cookie.load('user').preferredWorkingHours;
    if (this.props.from.hour >= preferredHours.from.hour && this.props.to.hour <= preferredHours.to.hour ) {
      if(this.props.from.hour == preferredHours.from.hour && this.props.from.minutes < preferredHours.from.minutes) {
        return "overHours";  
      }
      if(this.props.to.hour == preferredHours.to.hour && this.props.to.minutes > preferredHours.to.minutes) {
        return "overHours";  
      }
      return "underHours";
    } else {
      return "overHours";
    } 
  }
  render() {
    return (
      <div className={"row logitem " + this.isUnderWorkingHours()}>
        <div className="col-md-3 col-sm-6">
          <a href={`/dashboard/timelog/view/${this.props.timelogId}`}>
            <span>{(new Date(this.props.date)).toLocaleDateString("en-US")}</span>
          </a>
        </div>
        <div className="col-md-3 col-sm-6">
          <span >{this.props.from.hour}:{this.props.from.minutes} -  {this.props.to.hour}:{this.props.to.minutes}</span>
          
        </div>
        <div className="col-md-3 col-sm-6">
          <span className="message-body">{this.props.note}</span>
        </div>
        <div className="col-md-3 col-sm-6">
          <a href={`/dashboard/timelog/edit/${this.props.timelogId}`}>EDIT</a> <span> | </span>
          <a onClick={this.delete.bind(this)}>DELETE</a>
        </div>     
      </div>
    );
  }
}

// export default TimelogItem;
function mapStateToProps(state) {
  return {
    timelog: state.timesheet.timelog,
  };
}

export default connect(mapStateToProps, { deleteTimelog })(TimelogItem);
