import React, { Component } from 'react';
import cookie from 'react-cookie';
const moment = require('moment');

import TimelogItem from './timelog-item';

class TimelogList extends Component {
  constructor(props) {
    super(props);

    this.userCookie = cookie.load('user');
  }
  calcTotalHours() {
    if(this.props.timelogs && this.props.timelogs.length > 0) {
      let hours = 0
      let minutes = 0
      for(var i = 0; i < this.props.timelogs.length; i++){
        hours += this.props.timelogs[i].to.hour - this.props.timelogs[i].from.hour;
        minutes += this.props.timelogs[i].to.minutes - this.props.timelogs[i].from.minutes;
      }
      //return as minutes
      return hours * 60 + minutes;
    } else {
      return 0;
    }
  }

  renderSummary() {
    return (
      <div class="row">
        <h1> Report</h1>
        <p>Dates: {(new Date(this.props.timelogs[0].date)).toLocaleDateString("en-US")}</p>
        <p>Total Hours: {parseInt(this.calcTotalHours()/60)} hour(s):{this.calcTotalHours()%60} minute(s) </p>
        <p>Notes</p>
        <ul>
          {this.props.timelogs.map(timelog => {return (<li>{timelog.note}</li>)})}
        </ul>
      </div>
      )
  }

  render() {
    const currentUser = this.userCookie._id;

    return (
      <div>
        <div className="row">
          <div className="col-md-3 col-sm6">
            <b>Date</b>
          </div>
          <div className="col-md-3 col-sm6">
            <b>Time spent(From ~ To)</b>
          </div>
          <div className="col-md-3 col-sm6">
            <b>Notes</b>
          </div>
          <div className="col-md-3 col-sm6">
            <b>Operation</b>
          </div>
        </div>
        {this.props.timelogs.map(timelog => (
          <TimelogItem
            key={timelog._id}
            timelogId={timelog._id}
            date={timelog.date}
            from={timelog.from}
            to={timelog.to}
            note={timelog.note}
          />
        ))}
        {this.renderSummary()}
      </div>
    );
  }
}

export default TimelogList;
